import { pgTable, text, timestamp, numeric } from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { sub_service } from './sub-services';

export const sub_plan = pgTable('subscription_plans', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  sub_service_id: text('sub_service_id')
    .notNull()
    .references(() => sub_service.id, { onDelete: 'cascade' }),
  country: text('country').notNull(),
  plan_name: text('plan_name').notNull(),
  plan_price: numeric('plan_price', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  billing_cycle: text('billing_cycle', {
    enum: ['monthly', 'yearly', 'weekly'],
  })
    .notNull()
    .default('monthly'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const sub_planRelations = relations(sub_plan, ({ one }) => ({
  sub_service: one(sub_service, {
    fields: [sub_plan.sub_service_id],
    references: [sub_service.id],
  }),
}));
