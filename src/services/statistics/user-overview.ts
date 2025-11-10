import type { Context } from 'hono';

// lib
import { calculateSubscriptionOverview } from '@/lib/statistics/overview';

const getUserSubscriptionOverview = async (c: Context) => {
  const user = c.get('user');

  const overview = await calculateSubscriptionOverview(user.id);

  return c.json({
    success: true,
    data: overview,
  });
};

export { getUserSubscriptionOverview };
