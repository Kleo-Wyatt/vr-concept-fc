function createRateLimiter({ windowMs, maxRequests, message }) {
  const attempts = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip ?? req.socket.remoteAddress ?? 'unknown';
    const currentAttempt = attempts.get(key);

    if (!currentAttempt || currentAttempt.resetAt <= now) {
      attempts.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });

      next();
      return;
    }

    currentAttempt.count += 1;

    if (currentAttempt.count > maxRequests) {
      const retryAfterSeconds = Math.ceil(
        (currentAttempt.resetAt - now) / 1000,
      );

      res.setHeader('Retry-After', String(retryAfterSeconds));
      res.status(429).json({
        message,
      });
      return;
    }

    next();
  };
}

export const authRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
  message: 'Слишком много попыток входа. Попробуйте позже.',
});

export const publicFormRateLimit = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 5,
  message: 'Слишком много запросов. Попробуйте позже.',
});
