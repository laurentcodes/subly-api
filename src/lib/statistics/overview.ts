import {
  getUserSubscriptionCount,
  getUserSubscriptionCountByStatus,
  getUserSubscriptionPriceSumByCurrency,
  getUserSubscriptionDetails,
} from '@/lib/statistics/subscriptions';
import { convertCurrency } from '@/lib/currency/conversion';
import { getUserCurrency } from '@/lib/user';
import { getCurrencySymbol } from '@/utils/helpers';

export const calculateSubscriptionOverview = async (userId: string) => {
  const baseCurrency = await getUserCurrency(userId);
  const baseCurrencySymbol = await getCurrencySymbol(baseCurrency);

  const [
    totalSubscriptions,
    subscriptionsByStatusArray,
    totalPriceByCurrency,
    subscriptions,
  ] = await Promise.all([
    getUserSubscriptionCount(userId),
    getUserSubscriptionCountByStatus(userId),
    getUserSubscriptionPriceSumByCurrency(userId),
    getUserSubscriptionDetails(userId),
  ]);

  const subscriptionsByStatus: Record<string, number> = {
    active: 0,
    cancelled: 0,
    paused: 0,
    expired: 0,
  };
  subscriptionsByStatusArray.forEach((result) => {
    subscriptionsByStatus[result.status] = result.count;
  });

  const conversions = await Promise.all(
    totalPriceByCurrency.map(async ({ currency, total }) => {
      if (currency === baseCurrency) {
        return { success: true, result: parseFloat(total) };
      }
      return await convertCurrency(currency, baseCurrency, parseFloat(total));
    }),
  );

  const totalConvertedPrice = conversions.reduce((sum, conversion) => {
    if (conversion.success && conversion.result) {
      return sum + conversion.result;
    }
    return sum;
  }, 0);

  const subscriptionsWithConvertedPrices = await Promise.all(
    subscriptions.map(async (sub) => {
      if (sub.currency === baseCurrency) {
        return { ...sub, convertedPrice: parseFloat(sub.price) };
      }
      const conversion = await convertCurrency(
        sub.currency,
        baseCurrency,
        parseFloat(sub.price),
      );
      return {
        ...sub,
        convertedPrice: conversion.success ? conversion.result || 0 : 0,
      };
    }),
  );

  let totalConvertedActivePrice = 0;
  let mostExpensiveSubscription = null;
  let leastExpensiveSubscription = null;

  if (subscriptionsWithConvertedPrices.length > 0) {
    mostExpensiveSubscription = subscriptionsWithConvertedPrices[0];
    leastExpensiveSubscription = subscriptionsWithConvertedPrices[0];

    for (const sub of subscriptionsWithConvertedPrices) {
      if (sub.status === 'active') {
        totalConvertedActivePrice += sub.convertedPrice;
      }
      if (sub.convertedPrice > mostExpensiveSubscription.convertedPrice) {
        mostExpensiveSubscription = sub;
      }
      if (sub.convertedPrice < leastExpensiveSubscription.convertedPrice) {
        leastExpensiveSubscription = sub;
      }
    }
  }

  return {
    totalSubscriptions,
    subscriptionsByStatus,
    totalPriceByCurrency,
    baseCurrency,
    baseCurrencySymbol,
    totalConvertedPrice: totalConvertedPrice.toFixed(2),
    totalConvertedActivePrice: totalConvertedActivePrice.toFixed(2),
    subscriptions: subscriptionsWithConvertedPrices,
    mostExpensiveSubscription,
    leastExpensiveSubscription,
  };
};
