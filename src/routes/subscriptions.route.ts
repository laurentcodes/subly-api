import { Hono } from 'hono';

// lib
import { validator } from '@/lib/validator';

// middleware
import { requireAuth, requireVerifiedEmail } from '@/middleware/protected';

// schemas
import {
  createServiceSchema,
  createPlanSchema,
  subscribeUserSchema,
  updateSubscriptionStatusSchema,
} from '@/schemas/subscriptions';

// services
import {
  getAllSubscriptionServices,
  createSubscriptionService,
} from '@/services/subscriptions/services';

import {
  getAllSubscriptionPlans,
  createSubscriptionPlan,
  getAllSubscriptionPlansByServiceId,
} from '@/services/subscriptions/plans';

import {
  subscribeUserToPlan,
  getUserSubscriptions,
  updateUserSubscriptionStatus,
  deleteUserSubscription,
} from '@/services/subscriptions/user-subscriptions';

const subscriptions = new Hono();

// services
subscriptions.get('/services', requireAuth, getAllSubscriptionServices);
subscriptions.post(
  '/services',
  validator('json', createServiceSchema),
  requireAuth,
  createSubscriptionService,
);

// plans
subscriptions.get('/plans', requireAuth, getAllSubscriptionPlans);
subscriptions.get(
  '/plans/service/:serviceId',
  requireAuth,
  getAllSubscriptionPlansByServiceId,
);

subscriptions.post(
  '/plans',
  validator('json', createPlanSchema),
  requireAuth,
  createSubscriptionPlan,
);

// user subscriptions
subscriptions.get('/user', requireVerifiedEmail, getUserSubscriptions);

subscriptions.post(
  '/user',
  requireVerifiedEmail,
  validator('json', subscribeUserSchema),
  subscribeUserToPlan,
);

subscriptions.patch(
  '/user/:subscriptionId/status',
  requireVerifiedEmail,
  validator('json', updateSubscriptionStatusSchema),
  updateUserSubscriptionStatus,
);

subscriptions.delete(
  '/user/:subscriptionId',
  requireVerifiedEmail,
  deleteUserSubscription,
);

export { subscriptions };
