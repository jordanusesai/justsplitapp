import { Controller, Get, Post, Body } from '@nestjs/common'
import { SplitsService } from './splits.service'
import { CreateSplitDto } from '@justsplitapp/types'

@Controller('api/splits')
export class SplitsController {
  constructor(private readonly splitsService: SplitsService) {}

  @Get()
  findAll() {
    return this.splitsService.findAll()
  }

  @Post()
  create(@Body() createSplitDto: CreateSplitDto) {
    return this.splitsService.create(createSplitDto)
  }
}
