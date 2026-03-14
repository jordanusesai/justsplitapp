import { Injectable } from '@nestjs/common'

@Injectable()
export class SplitsService {
  findAll() {
    return []
  }

  create(createSplitDto: any) {
    return { message: 'Split created successfully', data: createSplitDto }
  }
}
