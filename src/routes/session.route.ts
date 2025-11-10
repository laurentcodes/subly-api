import { Hono } from 'hono';

// better auth
import type { auth } from '@/lib/auth';

const session = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

session.get('/', (c) => {
  const session = c.get('session');
  const user = c.get('user');

  if (!user) return c.body(null, 401);

  return c.json({
    session,
    user,
  });
});

export { session };
