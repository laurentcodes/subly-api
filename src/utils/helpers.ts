export const calculateNextBillingDate = (
  startDate: Date,
  billingCycle: 'monthly' | 'yearly' | 'weekly',
): Date => {
  const nextBillingDate = new Date(startDate);

  switch (billingCycle) {
    case 'weekly':
      nextBillingDate.setDate(nextBillingDate.getDate() + 7);
      break;
    case 'monthly':
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
      break;
    case 'yearly':
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
      break;
  }

  console.log('Calculated next billing date:', nextBillingDate);

  return nextBillingDate;
};

// fetch and cache currency symbols
const fetchCurrencySymbols = async (): Promise<Map<string, string>> => {
  // cache for currency symbols
  let currencySymbolsCache: Map<string, string> | null = null;

  if (currencySymbolsCache) {
    return currencySymbolsCache;
  }

  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/nhalstead/4c1652563dd13357ab936fc97703c019/raw/d5de097ef68f37501fb4d06030ca49f10f5f963a/currency-symbols.json',
    );

    const data = (await response.json()) as Array<{
      currency: string;
      abbreviation: string;
      symbol: string;
    }>;

    currencySymbolsCache = new Map(
      data.map((item) => [item.abbreviation, item.symbol]),
    );

    return currencySymbolsCache;
  } catch (error) {
    console.error('failed to fetch currency symbols:', error);
    return new Map();
  }
};

export const getCurrencySymbol = async (
  currencyCode: string,
): Promise<string> => {
  const symbols = await fetchCurrencySymbols();

  return symbols.get(currencyCode.toUpperCase()) ?? currencyCode;
};
