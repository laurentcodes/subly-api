import { eq, and } from 'drizzle-orm';
import { db } from '@/db';
import { currency_rate } from '@/db/schema';

const CACHE_TTL_HOURS = 12;

const getCachedRate = async (
  from: string,
  to: string,
): Promise<number | null> => {
  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();

  const result = await db
    .select()
    .from(currency_rate)
    .where(
      and(
        eq(currency_rate.from_currency, fromUpper),
        eq(currency_rate.to_currency, toUpper),
      ),
    )
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const cached = result[0];

  const cacheAge = Date.now() - new Date(cached.updated_at as Date).getTime();
  const cacheTTL = CACHE_TTL_HOURS * 60 * 60 * 1000;

  // check if cache is still valid
  if (cacheAge > cacheTTL) {
    return null;
  }

  return parseFloat(cached.rate);
};

const setCachedRate = async (
  from: string,
  to: string,
  rate: number,
): Promise<void> => {
  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();

  try {
    await db
      .insert(currency_rate)
      .values({
        from_currency: fromUpper,
        to_currency: toUpper,
        rate: rate.toString(),
        updated_at: new Date(),
      })
      .onConflictDoUpdate({
        target: [currency_rate.from_currency, currency_rate.to_currency],
        set: {
          rate: rate.toString(),
          updated_at: new Date(),
        },
      });
  } catch (error) {
    console.error('Error caching rate:', error);
    throw error;
  }
};

export { getCachedRate, setCachedRate };
