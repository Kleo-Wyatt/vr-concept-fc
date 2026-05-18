export const AUTH_COOKIE_NAME = 'vr_concept_fc_admin_token';

const DEFAULT_COOKIE_MAX_AGE = 12 * 60 * 60 * 1000;

function parseExpiresInToMs(value) {
  if (!value) {
    return DEFAULT_COOKIE_MAX_AGE;
  }

  const normalizedValue = String(value).trim();
  const match = normalizedValue.match(/^(\d+)(ms|s|m|h|d)$/);

  if (!match) {
    return DEFAULT_COOKIE_MAX_AGE;
  }

  const amount = Number(match[1]);
  const unit = match[2];

  const multipliers = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return amount * multipliers[unit];
}

function getBaseCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  };
}

export function getAuthCookieOptions() {
  return {
    ...getBaseCookieOptions(),
    maxAge: parseExpiresInToMs(process.env.JWT_EXPIRES_IN),
  };
}

export function getAuthCookieClearOptions() {
  return getBaseCookieOptions();
}

export function getCookieValue(req, cookieName) {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    return '';
  }

  const cookies = cookieHeader.split(';');

  for (const cookie of cookies) {
    const [name, ...valueParts] = cookie.trim().split('=');

    if (name === cookieName) {
      return decodeURIComponent(valueParts.join('='));
    }
  }

  return '';
}
