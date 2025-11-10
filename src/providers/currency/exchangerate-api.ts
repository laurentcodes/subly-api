import type { CurrencyProvider } from './interface';

class ExchangeRateAPIProvider implements CurrencyProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async convert(from: string, to: string, amount: number) {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${from}/${to}/${amount}`,
      );

      const data = await response.json();

      if (data.result === 'error') {
        return {
          success: false,
          error: data.error_type || 'Conversion failed',
        };
      }

      return {
        success: true,
        rate: data.conversion_rate,
        result: data.conversion_result,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

export { ExchangeRateAPIProvider };
