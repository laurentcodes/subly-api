import 'dotenv/config';

// drizzle
import { drizzle } from 'drizzle-orm/node-postgres';
import * as sub_service_schema from './schema';

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: { ...sub_service_schema },
});
