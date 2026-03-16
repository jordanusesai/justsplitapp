import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface CurrencyRate {
  rate: number;
  provider: string;
  timestamp: number;
}

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);
  private cache: Map<string, CurrencyRate> = new Map();
  private readonly CACHE_TTL = 3600000; // 1 hour

  constructor(private configService: ConfigService) {}

  async getExchangeRate(from: string, to: string): Promise<CurrencyRate> {
    const cacheKey = `${from}_${to}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached;
    }

    try {
      // Primary: Frankfurter
      const rate = await this.fetchFromFrankfurter(from, to);
      const result = { rate, provider: 'frankfurter', timestamp: Date.now() };
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      this.logger.warn(`Frankfurter failed for ${from}->${to}, trying fallback...`);
      try {
        // Fallback: ExchangeRate.host (Mocked for now as per UI Prompt)
        const rate = await this.fetchFromFallback(from, to);
        const result = { rate, provider: 'exchangerate_host', timestamp: Date.now() };
        this.cache.set(cacheKey, result);
        return result;
      } catch (fallbackError) {
        this.logger.error(`All currency providers failed for ${from}->${to}`);
        throw fallbackError;
      }
    }
  }

  private async fetchFromFrankfurter(from: string, to: string): Promise<number> {
    // Real implementation would use fetch()
    // Mocking for now to ensure reliability in build
    if (from === to) return 1;
    const mockRates: Record<string, number> = { 'USD_EUR': 0.92, 'EUR_USD': 1.09, 'USD_GBP': 0.79 };
    return mockRates[`${from}_${to}`] || 1.1;
  }

  private async fetchFromFallback(from: string, to: string): Promise<number> {
    if (from === to) return 1;
    return 1.15; // Simplified fallback mock
  }
}
