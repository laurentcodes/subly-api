import type { Context } from 'hono';
import { eq, asc } from 'drizzle-orm';

// db
import { db } from '@/db';
import { user_subscription } from '@/db/schema';

// utils
import { getCurrencySymbol } from '@/utils/helpers';

const getUpcomingPayments = async (c: Context) => {
  const user = c.get('user');

  // fetch active subscriptions ordered by next_billing_date
  const subscriptions = await db.query.user_subscription.findMany({
    where: eq(user_subscription.user_id, user.id),
    orderBy: [asc(user_subscription.next_billing_date)],
    with: {
      sub_plan: {
        columns: {
          plan_name: true,
          plan_price: true,
          currency: true,
          billing_cycle: true,
        },
        with: {
          sub_service: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });

  // filter active subscriptions with next_billing_date and map to response format
  const upcomingPayments = await Promise.all(
    subscriptions
      .filter((sub) => sub.status === 'active' && sub.next_billing_date)
      .map(async (sub) => ({
        id: sub.id,
        serviceName: sub.sub_plan.sub_service.name,
        planName: sub.sub_plan.plan_name,
        price: sub.sub_plan.plan_price,
        currency: sub.sub_plan.currency,
        currencySymbol: await getCurrencySymbol(sub.sub_plan.currency),
        billingCycle: sub.sub_plan.billing_cycle,
        nextBillingDate: sub.next_billing_date,
        autoRenew: sub.auto_renew,
      })),
  );

  return c.json({
    success: true,
    data: {
      upcomingPayments,
      total: upcomingPayments.length,
    },
  });
};

export { getUpcomingPayments };
