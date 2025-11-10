import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { sub_plan } from './sub-plans';

export const sub_service = pgTable('subscription_services', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull().unique(),
  image_url: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sub_serviceRelations = relations(sub_service, ({ many }) => ({
  plans: many(sub_plan),
}));
