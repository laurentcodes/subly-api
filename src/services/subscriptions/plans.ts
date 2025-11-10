import type { Context } from 'hono';
import { and, eq } from 'drizzle-orm';

// db
import { db } from '@/db';
import { sub_plan, user_settings } from '@/db/schema';

// lib
import { getPlanByUniqueConstraints } from '@/lib/subscriptions';

// helpers
import { getCurrencySymbol } from '@/utils/helpers';

const getAllSubscriptionPlans = async (c: Context) => {
  const plans = await db.query.sub_plan.findMany({
    orderBy: (sub_plan, { desc }) => [desc(sub_plan.id)],
    with: {
      sub_service: true,
    },
  });

  const plansWithServiceName = plans.map((plan) => {
    const { sub_service, ...planData } = plan;

    return {
      ...planData,
      service_name: sub_service?.name,
    };
  });

  return c.json({
    success: true,
    data: plansWithServiceName,
    total: plans.length,
  });
};

const getAllSubscriptionPlansByServiceId = async (c: Context) => {
  const user = c.get('user');

  const { serviceId } = c.req.param();

  // fetch user settings to check currency filter preference
  const settings = await db.query.user_settings.findFirst({
    where: (user_settings, { eq }) => eq(user_settings.user_id, user.id),
  });

  // build where conditions
  const whereConditions = [eq(sub_plan.sub_service_id, serviceId)];

  // apply currency filter if show_only_base_currency is enabled and baseCurrency is set
  if (settings?.show_only_base_currency && settings?.baseCurrency) {
    whereConditions.push(eq(sub_plan.currency, settings.baseCurrency));
  }

  const plans = await db.query.sub_plan.findMany({
    where: and(...whereConditions),
    orderBy: (sub_plan, { asc }) => [asc(sub_plan.plan_name)],
    with: {
      sub_service: true,
    },
  });

  const plansWithServiceName = await Promise.all(
    plans.map(async (plan) => {
      const { sub_service, ...planData } = plan;

      return {
        ...planData,
        service_name: sub_service?.name,
        currency_symbol: await getCurrencySymbol(plan.currency),
      };
    }),
  );

  return c.json({
    success: true,
    data: plansWithServiceName,
    total: plans.length,
  });
};

const createSubscriptionPlan = async (c: Context) => {
  const body = c.get('validatedData');

  const planExists = await getPlanByUniqueConstraints(
    body.sub_service_id,
    body.country,
    body.plan_name,
    body.currency,
    body.plan_price,
  );

  if (planExists) {
    return c.json(
      {
        success: false,
        error:
          'A plan with this service, country, name, currency, and price already exists',
      },
      400,
    );
  }

  const [newPlan] = await db.insert(sub_plan).values(body).returning();

  return c.json({ success: true, data: newPlan }, 201);
};

export {
  getAllSubscriptionPlans,
  createSubscriptionPlan,
  getAllSubscriptionPlansByServiceId,
};
