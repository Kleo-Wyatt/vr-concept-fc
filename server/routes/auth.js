import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { requireAuth } from '../middleware/requireAuth.js';

export const authRouter = Router();

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
}

function getAdminCredentials() {
  return {
    login: process.env.ADMIN_LOGIN ?? 'admin',
    password: process.env.ADMIN_PASSWORD ?? 'admin123',
  };
}

authRouter.post('/login', (req, res) => {
  const login = String(req.body.login ?? '').trim();
  const password = String(req.body.password ?? '');

  if (!login || !password) {
    res.status(400).json({
      message: 'Введите логин и пароль',
    });
    return;
  }

  const admin = getAdminCredentials();

  if (login !== admin.login || password !== admin.password) {
    res.status(401).json({
      message: 'Неверный логин или пароль',
    });
    return;
  }

  const token = jwt.sign(
    {
      role: 'admin',
      login: admin.login,
    },
    getJwtSecret(),
    {
      expiresIn: process.env.JWT_EXPIRES_IN ?? '12h',
    },
  );

  res.json({
    token,
    user: {
      login: admin.login,
      role: 'admin',
    },
  });
});

authRouter.get('/me', requireAuth, (req, res) => {
  res.json({
    user: {
      login: req.admin.login,
      role: req.admin.role,
    },
  });
});
