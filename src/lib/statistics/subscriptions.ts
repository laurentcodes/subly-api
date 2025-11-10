import { eq, sql } from 'drizzle-orm';

// lib
import { db } from '@/db';
import { user_subscription } from '@/db/schema';

// utils
import { getCurrencySymbol } from '@/utils/helpers';

const getUserSubscriptionCount = async (userId: string) => {
  const result = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(user_subscription)
    .where(eq(user_subscription.user_id, userId));

  return result[0]?.count || 0;
};

const getUserSubscriptionCountByStatus = async (userId: string) => {
  const results = await db
    .select({
      status: user_subscription.status,
      count: sql<number>`count(*)::int`,
    })
    .from(user_subscription)
    .where(eq(user_subscription.user_id, userId))
    .groupBy(user_subscription.status);

  return results;
};

const getUserSubscriptionPriceSumByCurrency = async (userId: string) => {
  const results = await db
    .select({
      currency: sql<string>`sp.currency`,
      total: sql<string>`sum(sp.plan_price)::numeric(10,2)`,
    })
    .from(user_subscription)
    .innerJoin(
      sql`subscription_plans sp`,
      sql`sp.id = ${user_subscription.sub_plan_id}`,
    )
    .where(eq(user_subscription.user_id, userId))
    .groupBy(sql`sp.currency`);

  return Promise.all(
    results.map(async (result) => ({
      currency: result.currency,
      currencySymbol: await getCurrencySymbol(result.currency),
      total: result.total,
    })),
  );
};

const getUserSubscriptionDetails = async (userId: string) => {
  const subscriptions = await db.query.user_subscription.findMany({
    where: (user_subscription, { eq }) => eq(user_subscription.user_id, userId),
    orderBy: (user_subscription, { desc }) => [
      desc(user_subscription.createdAt),
    ],
    with: {
      sub_plan: {
        columns: {
          plan_name: true,
          plan_price: true,
          currency: true,
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

  return Promise.all(
    subscriptions.map(async (sub) => ({
      id: sub.id,
      serviceName: sub.sub_plan.sub_service.name,
      planName: sub.sub_plan.plan_name,
      price: sub.sub_plan.plan_price,
      currency: sub.sub_plan.currency,
      currencySymbol: await getCurrencySymbol(sub.sub_plan.currency),
      status: sub.status,
      nextBillingDate: sub.next_billing_date,
    })),
  );
};

export {
  getUserSubscriptionCount,
  getUserSubscriptionCountByStatus,
  getUserSubscriptionPriceSumByCurrency,
  getUserSubscriptionDetails,
};
