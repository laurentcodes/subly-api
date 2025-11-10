import type { Context } from 'hono';
import { eq } from 'drizzle-orm';

// db
import { db } from '@/db';
import { user_subscription } from '@/db/schema';

const getAutoRenewStatus = async (c: Context) => {
  const user = c.get('user');

  // fetch active subscriptions
  const subscriptions = await db.query.user_subscription.findMany({
    where: eq(user_subscription.user_id, user.id),
  });

  // filter active subscriptions
  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === 'active',
  );

  // count auto-renew statuses
  const autoRenewCount = activeSubscriptions.filter(
    (sub) => sub.auto_renew === true,
  ).length;

  const nonAutoRenewCount = activeSubscriptions.filter(
    (sub) => sub.auto_renew === false,
  ).length;

  return c.json({
    success: true,
    data: {
      autoRenewEnabled: autoRenewCount,
      autoRenewDisabled: nonAutoRenewCount,
      total: activeSubscriptions.length,
    },
  });
};

export { getAutoRenewStatus };
