import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService, CurrencyRate } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('rate')
  async getRate(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Promise<CurrencyRate> {
    return this.currencyService.getExchangeRate(from || 'USD', to || 'EUR');
  }
}
