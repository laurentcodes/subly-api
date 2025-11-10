import { createMiddleware } from 'hono/factory';
import { eq } from 'drizzle-orm';

// better auth
import { auth } from '@/lib/auth';

// db
import { db } from '@/db';
import { user_settings } from '@/db/schemas/settings';

const authMiddleware = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set('user', null);
    c.set('session', null);

    return next();
  }

  // Fetch user settings including baseCurrency
  const settings = await db.query.user_settings.findFirst({
    where: eq(user_settings.user_id, session.user.id),
  });

  c.set('user', {
    id: session.user.id,
    emailVerified: session.user.emailVerified,
    baseCurrency: settings?.baseCurrency || null,
  });

  c.set('session', session.session);

  return next();
});

export { authMiddleware };
