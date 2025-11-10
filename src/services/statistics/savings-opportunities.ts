import type { Context } from 'hono';
import { and, eq, inArray } from 'drizzle-orm';

// db
import { db } from '@/db';
import { sub_plan } from '@/db/schemas/sub-plans';
import { user_subscription } from '@/db/schemas/user-subscriptions';

// utils
import { getCurrencySymbol } from '@/utils/helpers';

export const getSavingsOpportunities = async (c: Context) => {
  const user = c.get('user');

  const monthlySubscriptions = await db.query.user_subscription.findMany({
    where: and(
      eq(user_subscription.user_id, user.id),
      eq(user_subscription.status, 'active'),
    ),
    with: {
      sub_plan: {
        with: {
          sub_service: true,
        },
      },
    },
  });

  const monthlyOnlySubscriptions = monthlySubscriptions.filter(
    (sub) => sub.sub_plan.billing_cycle === 'monthly',
  );

  if (monthlyOnlySubscriptions.length === 0) {
    return c.json({ success: true, data: [] });
  }

  const serviceIds = monthlyOnlySubscriptions.map(
    (sub) => sub.sub_plan.sub_service_id,
  );

  if (serviceIds.length === 0) {
    return c.json({ success: true, data: [] });
  }

  const yearlyPlans = await db.query.sub_plan.findMany({
    where: and(
      inArray(sub_plan.sub_service_id, serviceIds),
      eq(sub_plan.billing_cycle, 'yearly'),
    ),
  });

  const savingsOpportunities = [];

  for (const sub of monthlyOnlySubscriptions) {
    // only find yearly plan with same name
    const yearlyPlan = yearlyPlans.find(
      (p) =>
        p.sub_service_id === sub.sub_plan.sub_service_id &&
        p.currency === sub.sub_plan.currency &&
        p.plan_name === sub.sub_plan.plan_name,
    );

    if (yearlyPlan) {
      const monthlyPrice = Number(sub.sub_plan.plan_price);
      const yearlyPrice = Number(yearlyPlan.plan_price);

      const currency = sub.sub_plan.currency;

      const annualCostMonthly = monthlyPrice * 12;
      const savings = annualCostMonthly - yearlyPrice;

      if (savings > 0) {
        const currencySymbol = await getCurrencySymbol(currency);

        savingsOpportunities.push({
          serviceName: sub.sub_plan.sub_service.name,
          serviceImageUrl: sub.sub_plan.sub_service.image_url,
          monthlyPlan: {
            id: sub.sub_plan.id,
            name: sub.sub_plan.plan_name,
            price: monthlyPrice.toFixed(2),
            currency,
            currencySymbol,
          },
          yearlyPlan: {
            id: yearlyPlan.id,
            name: yearlyPlan.plan_name,
            price: yearlyPrice.toFixed(2),
            currency,
            currencySymbol,
          },
          currency,
          currencySymbol,
          savings: savings.toFixed(2),
        });
      }
    }
  }

  return c.json({ success: true, data: savingsOpportunities });
};
