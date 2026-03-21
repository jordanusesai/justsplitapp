import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CurrencyService, CurrencyRate } from './currency.service';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('rate')
  @ApiOperation({ summary: 'Get exchange rate between two currencies' })
  @ApiQuery({ name: 'from', required: false, example: 'USD' })
  @ApiQuery({ name: 'to', required: false, example: 'EUR' })
  async getRate(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Promise<CurrencyRate> {
    return this.currencyService.getExchangeRate(from || 'USD', to || 'EUR');
  }
}
