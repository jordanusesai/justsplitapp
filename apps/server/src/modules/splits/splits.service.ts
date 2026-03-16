import { Injectable, Logger } from '@nestjs/common'
import { CreateSplitDto } from '@justsplitapp/types'

@Injectable()
export class SplitsService {
  private readonly logger = new Logger(SplitsService.name);

  findAll() {
    return []
  }

  create(createSplitDto: CreateSplitDto) {
    this.logger.log(`Creating split: ${createSplitDto.title} with rate lock from ${createSplitDto.exchangeRateProvider || 'none'}`);
    
    // In a real implementation, we would save the exchangeRate, provider, and timestamp 
    // to the database here to ensure the rate is "locked" for this transaction.
    
    return { 
      message: 'Split created successfully with locked exchange rate', 
      data: {
        ...createSplitDto,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
      }
    }
  }
}
