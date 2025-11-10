import {
  pgTable,
  text,
  timestamp,
  numeric,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const currency_rate = pgTable(
  'currency_rates',
  {
    id: text('id').primaryKey().default(sql`gen_random_uuid()`),
    from_currency: text('from_currency').notNull(),
    to_currency: text('to_currency').notNull(),
    rate: numeric('rate', { precision: 20, scale: 10 }).notNull(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    currencyPairIdx: uniqueIndex('currency_pair_idx').on(
      table.from_currency,
      table.to_currency,
    ),
  }),
);
