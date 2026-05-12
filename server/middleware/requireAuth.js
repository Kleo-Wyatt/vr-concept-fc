import jwt from 'jsonwebtoken';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
}

export function requireAuth(req, res, next) {
  const authorizationHeader = req.get('authorization') ?? '';
  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({
      message: 'Требуется авторизация',
    });
    return;
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());

    if (!payload || payload.role !== 'admin') {
      res.status(403).json({
        message: 'Недостаточно прав',
      });
      return;
    }

    req.admin = {
      login: payload.login,
      role: payload.role,
    };

    next();
  } catch {
    res.status(401).json({
      message: 'Сессия истекла или токен недействителен',
    });
  }
}
