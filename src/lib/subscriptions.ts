import { db } from '@/db';
import { sub_plan } from '@/db/schema';

// get plan by name
const getPlanByName = async (name: string) => {
  const plan = await db.query.sub_plan.findFirst({
    where: (sub_plan, { eq }) => eq(sub_plan.plan_name, name),
  });

  return plan;
};

// get plan by unique constraints
const getPlanByUniqueConstraints = async (
  serviceId: string,
  country: string,
  planName: string,
  currency: string,
  planPrice: string,
) => {
  const plan = await db.query.sub_plan.findFirst({
    where: (sub_plan, { eq, and }) =>
      and(
        eq(sub_plan.sub_service_id, serviceId),
        eq(sub_plan.country, country),
        eq(sub_plan.plan_name, planName),
        eq(sub_plan.currency, currency),
        eq(sub_plan.plan_price, planPrice),
      ),
  });

  return plan;
};

export { getPlanByName, getPlanByUniqueConstraints };
