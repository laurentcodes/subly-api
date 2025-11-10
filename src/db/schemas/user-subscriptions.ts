import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { user } from './auth';
import { sub_plan } from './sub-plans';

export const user_subscription = pgTable('user_subscriptions', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  user_id: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  sub_plan_id: text('sub_plan_id')
    .notNull()
    .references(() => sub_plan.id, { onDelete: 'cascade' }),
  status: text('status', {
    enum: ['active', 'cancelled', 'expired', 'paused'],
  })
    .notNull()
    .default('active'),
  start_date: timestamp('start_date').notNull().defaultNow(),
  end_date: timestamp('end_date'),
  next_billing_date: timestamp('next_billing_date'),
  cancelled_at: timestamp('cancelled_at'),
  auto_renew: boolean('auto_renew').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const user_subscriptionRelations = relations(
  user_subscription,
  ({ one }) => ({
    user: one(user, {
      fields: [user_subscription.user_id],
      references: [user.id],
    }),
    sub_plan: one(sub_plan, {
      fields: [user_subscription.sub_plan_id],
      references: [sub_plan.id],
    }),
  })
);
