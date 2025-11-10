import type { CurrencyProvider } from './interface';
import { ExchangeRateAPIProvider } from './exchangerate-api';

const getProvider = (): CurrencyProvider => {
  const provider = process.env.EXCHANGE_RATE_API_PROVIDER;
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;

  if (!apiKey) {
    throw new Error('Exchange rate API key not configured');
  }

  switch (provider) {
    case 'exchangerate-api':
      return new ExchangeRateAPIProvider(apiKey);
    default:
      throw new Error(`Unknown currency provider: ${provider}`);
  }
};

export { getProvider };
