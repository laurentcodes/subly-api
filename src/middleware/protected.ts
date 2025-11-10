import { createMiddleware } from 'hono/factory';

export const requireAuth = createMiddleware(async (c, next) => {
  const user = c.get('user');

  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }

  return next();
});

export const requireVerifiedEmail = createMiddleware(async (c, next) => {
  const user = c.get('user');

  if (!user) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }

  if (!user.emailVerified) {
    return c.json(
      { success: false, error: 'Email verification required' },
      403,
    );
  }

  return next();
});
