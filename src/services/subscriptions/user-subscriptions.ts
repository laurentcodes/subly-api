import type { Context } from 'hono';
import { eq } from 'drizzle-orm';

// db
import { db } from '@/db';
import { user_subscription } from '@/db/schema';

// helpers
import { calculateNextBillingDate, getCurrencySymbol } from '@/utils/helpers';

const getUserSubscriptions = async (c: Context) => {
  const user = c.get('user');

  const subscriptions = await db.query.user_subscription.findMany({
    where: (user_subscription, { eq }) =>
      eq(user_subscription.user_id, user.id),
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
              image_url: true,
            },
          },
        },
      },
    },
  });

  // add currency symbols to subscriptions
  const subscriptionsWithSymbols = await Promise.all(
    subscriptions.map(async (sub) => ({
      ...sub,
      sub_plan: {
        ...sub.sub_plan,
        currency_symbol: await getCurrencySymbol(sub.sub_plan.currency),
      },
    })),
  );

  return c.json({
    success: true,
    data: subscriptionsWithSymbols,
    total: subscriptions.length,
  });
};

const subscribeUserToPlan = async (c: Context) => {
  const user = c.get('user');
  const body = c.get('validatedData');

  // check if plan exists
  const plan = await db.query.sub_plan.findFirst({
    where: (sub_plan, { eq }) => eq(sub_plan.id, body.sub_plan_id),
  });

  if (!plan) {
    return c.json(
      { success: false, message: 'Subscription plan not found' },
      404,
    );
  }

  // check if user already has an active subscription to this plan
  const existingSubscription = await db.query.user_subscription.findFirst({
    where: (user_subscription, { eq, and }) =>
      and(
        eq(user_subscription.user_id, user.id),
        eq(user_subscription.sub_plan_id, body.sub_plan_id),
        eq(user_subscription.status, 'active'),
      ),
  });

  if (existingSubscription) {
    return c.json(
      {
        success: false,
        message: 'You already have an active subscription to this plan',
      },
      400,
    );
  }

  const startDate = body.start_date || new Date();
  const billingCycle = plan.billing_cycle;
  const nextBillingDate =
    body.next_billing_date || calculateNextBillingDate(startDate, billingCycle);

  const [subscription] = await db
    .insert(user_subscription)
    .values({
      user_id: user.id,
      sub_plan_id: body.sub_plan_id,
      start_date: startDate,
      end_date: body.end_date,
      next_billing_date: nextBillingDate,
      auto_renew: body.auto_renew ?? true,
      status: body.status || 'active',
    })
    .returning();

  return c.json({ success: true, data: subscription }, 201);
};

const updateUserSubscriptionStatus = async (c: Context) => {
  const user = c.get('user');
  const body = c.get('validatedData');

  const subscriptionId = c.req.param('subscriptionId');

  const subscription = await db.query.user_subscription.findFirst({
    where: (user_subscription, { eq, and }) =>
      and(
        eq(user_subscription.id, subscriptionId),
        eq(user_subscription.user_id, user.id),
      ),
  });

  console.log('Request body:', subscription);

  if (!subscription) {
    return c.json({ success: false, message: 'Subscription not found' }, 404);
  }

  const updateData: {
    status: 'active' | 'cancelled' | 'expired' | 'paused';
    cancelled_at?: Date | null;
  } = {
    status: body.status as 'active' | 'cancelled' | 'expired' | 'paused',
  };

  if (body.status === 'cancelled') {
    updateData.cancelled_at = new Date();
  } else {
    // reset cancelled_at if status is changed to anything other than cancelled
    updateData.cancelled_at = null;
  }

  const [updatedSubscription] = await db
    .update(user_subscription)
    .set(updateData)
    .where(eq(user_subscription.id, subscriptionId))
    .returning();

  return c.json({ success: true, data: updatedSubscription });
};

const deleteUserSubscription = async (c: Context) => {
  const user = c.get('user');
  const subscriptionId = c.req.param('subscriptionId');

  // check if subscription exists and belongs to user
  const subscription = await db.query.user_subscription.findFirst({
    where: (user_subscription, { eq, and }) =>
      and(
        eq(user_subscription.id, subscriptionId),
        eq(user_subscription.user_id, user.id),
      ),
  });

  if (!subscription) {
    return c.json({ success: false, message: 'Subscription not found' }, 404);
  }

  // delete the subscription
  await db
    .delete(user_subscription)
    .where(eq(user_subscription.id, subscriptionId));

  return c.json({
    success: true,
    message: 'Subscription deleted successfully',
  });
};

export {
  subscribeUserToPlan,
  getUserSubscriptions,
  updateUserSubscriptionStatus,
  deleteUserSubscription,
};
