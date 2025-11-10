import { z } from 'zod';

// services
export const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  image_url: z.string().url('Must be a valid URL').optional(),
});

// plans
export const createPlanSchema = z.object({
  sub_service_id: z
    .string()
    .min(1, 'Service ID is required')
    .uuid('Service ID must be a valid UUID'),
  country: z
    .string()
    .min(2, 'Country code must be at least 2 characters')
    .max(2, 'Country code must be exactly 2 characters')
    .toUpperCase(),
  plan_name: z.string().min(1, 'Plan name is required').trim(),
  plan_price: z.number().positive('Price must be a positive number'),
  currency: z
    .string()
    .min(1, 'Currency is required')
    .length(3, 'Currency must be a 3-letter code')
    .toUpperCase(),
  billing_cycle: z
    .enum(['monthly', 'yearly', 'weekly'])
    .optional()
    .default('monthly'),
});

// user subscriptions
export const subscribeUserSchema = z.object({
  sub_plan_id: z
    .string()
    .min(1, 'Plan ID is required')
    .uuid('Plan ID must be a valid UUID'),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  next_billing_date: z.coerce.date().optional(),
  auto_renew: z.boolean().optional().default(true),
  status: z
    .enum(['active', 'cancelled', 'expired', 'paused'])
    .optional()
    .default('active'),
});

export const updateSubscriptionStatusSchema = z.object({
  status: z.enum(['active', 'cancelled', 'expired', 'paused'], {
    message: 'Status must be one of: active, cancelled, expired, paused',
  }),
});

export const updateAutoRenewSchema = z.object({
  auto_renew: z.boolean(),
});
