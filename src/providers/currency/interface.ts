interface CurrencyProvider {
  convert(
    from: string,
    to: string,
    amount: number,
  ): Promise<{
    success: boolean;
    rate?: number;
    base_code?: string;
    target_code?: string;
    result?: number;
    error?: string;
  }>;
}

export type { CurrencyProvider };
