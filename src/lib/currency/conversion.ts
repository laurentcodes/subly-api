import { getProvider } from '@/providers/currency';

import { getCachedRate, setCachedRate } from './cache';

const convertCurrency = async (from: string, to: string, amount: number) => {
  try {
    // check database cache first
    const cachedRate = await getCachedRate(from, to);

    if (cachedRate !== null) {
      return {
        success: true,
        rate: cachedRate,
        result: amount * cachedRate,
      };
    }

    // cache miss - fetch from provider
    const provider = getProvider();
    const result = await provider.convert(from, to, amount);

    // cache the rate if successful
    if (result.success && result.rate) {
      await setCachedRate(from, to, result.rate);
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Provider initialization failed',
    };
  }
};

export { convertCurrency };
