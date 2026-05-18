import jwt from 'jsonwebtoken';

import { AUTH_COOKIE_NAME, getCookieValue } from '../lib/authCookie.js';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
}

export function requireAuth(req, res, next) {
  const token = getCookieValue(req, AUTH_COOKIE_NAME);

  if (!token) {
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
