import type { Context } from 'hono';
import { eq } from 'drizzle-orm';

// db
import { db } from '@/db';
import { user_subscription } from '@/db/schema';

const getBillingCycleDistribution = async (c: Context) => {
  const user = c.get('user');

  // fetch active subscriptions with billing cycle
  const subscriptions = await db.query.user_subscription.findMany({
    where: eq(user_subscription.user_id, user.id),
    with: {
      sub_plan: {
        columns: {
          billing_cycle: true,
        },
      },
    },
  });

  // filter active subscriptions
  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === 'active',
  );

  // initialize counts for all billing cycles
  const billingCycleDistribution: Record<string, number> = {
    monthly: 0,
    yearly: 0,
    weekly: 0,
  };

  // count subscriptions by billing cycle
  activeSubscriptions.forEach((sub) => {
    const cycle = sub.sub_plan.billing_cycle;
    billingCycleDistribution[cycle] = (billingCycleDistribution[cycle] || 0) + 1;
  });

  return c.json({
    success: true,
    data: {
      billingCycleDistribution,
      total: activeSubscriptions.length,
    },
  });
};

export { getBillingCycleDistribution };
