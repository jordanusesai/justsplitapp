import { Controller, Get, Post, Body } from '@nestjs/common'
import { SplitsService } from './splits.service'

@Controller('api/splits')
export class SplitsController {
  constructor(private readonly splitsService: SplitsService) {}

  @Get()
  findAll() {
    return this.splitsService.findAll()
  }

  @Post()
  create(@Body() createSplitDto: any) {
    return this.splitsService.create(createSplitDto)
  }
}
