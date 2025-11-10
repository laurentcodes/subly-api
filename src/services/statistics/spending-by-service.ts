import type { Context } from 'hono';
import { eq } from 'drizzle-orm';

// db
import { db } from '@/db';
import { user_subscription } from '@/db/schema';

// lib
import { convertCurrency } from '@/lib/currency/conversion';
import { getUserCurrency } from '@/lib/user';

// utils
import { getCurrencySymbol } from '@/utils/helpers';

const getSpendingByService = async (c: Context) => {
  const user = c.get('user');

  const baseCurrency = await getUserCurrency(user.id);
  const baseCurrencySymbol = await getCurrencySymbol(baseCurrency);

  // fetch active subscriptions with service and plan details
  const subscriptions = await db.query.user_subscription.findMany({
    where: eq(user_subscription.user_id, user.id),
    with: {
      sub_plan: {
        columns: {
          plan_price: true,
          currency: true,
        },
        with: {
          sub_service: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });

  // filter active subscriptions
  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === 'active',
  );

  // group by service and currency
  const serviceSpendingMap = new Map<
    string,
    { total: number; count: number; currency: string }
  >();

  for (const sub of activeSubscriptions) {
    const serviceName = sub.sub_plan.sub_service.name;
    const price = parseFloat(sub.sub_plan.plan_price);
    const currency = sub.sub_plan.currency;

    // create unique key for service + currency combination
    const key = `${serviceName}|${currency}`;

    // update service spending
    const existing = serviceSpendingMap.get(key);
    if (existing) {
      serviceSpendingMap.set(key, {
        total: existing.total + price,
        count: existing.count + 1,
        currency,
      });
    } else {
      serviceSpendingMap.set(key, {
        total: price,
        count: 1,
        currency,
      });
    }
  }

  // convert map to array
  const spendingByService = await Promise.all(
    Array.from(serviceSpendingMap.entries()).map(async ([key, data]) => {
      const [serviceName] = key.split('|');
      return {
        serviceName,
        totalSpending: data.total.toFixed(2),
        subscriptionCount: data.count,
        currency: data.currency,
        currencySymbol: await getCurrencySymbol(data.currency),
        _rawTotal: data.total, // temporary field for conversion
      };
    }),
  );

  // sort by total spending (descending)
  spendingByService.sort(
    (a, b) => parseFloat(b.totalSpending) - parseFloat(a.totalSpending),
  );

  // calculate total converted price
  let totalConvertedPrice = 0;
  for (const service of spendingByService) {
    let convertedAmount = service._rawTotal;
    if (service.currency !== baseCurrency) {
      const conversion = await convertCurrency(service.currency, baseCurrency, service._rawTotal);
      convertedAmount = conversion.success && conversion.result ? conversion.result : 0;
    }
    totalConvertedPrice += convertedAmount;
  }

  // remove temporary field
  const finalSpendingByService = spendingByService.map(({ _rawTotal, ...rest }) => rest);

  return c.json({
    success: true,
    data: {
      spendingByService: finalSpendingByService,
      totalConvertedPrice: totalConvertedPrice.toFixed(2),
      baseCurrency,
      baseCurrencySymbol,
    },
  });
};

export { getSpendingByService };
