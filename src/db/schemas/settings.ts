import {
  pgTable,
  text,
  timestamp,
  boolean,
  varchar,
} from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';
import { user } from './auth';

export const user_settings = pgTable('user_settings', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  user_id: text('user_id')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  show_only_base_currency: boolean('show_only_base_currency')
    .notNull()
    .default(false),
  baseCurrency: varchar('base_currency', { length: 3 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const user_settingsRelations = relations(user_settings, ({ one }) => ({
  user: one(user, {
    fields: [user_settings.user_id],
    references: [user.id],
  }),
}));
