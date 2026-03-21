import { Controller, Get, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { SplitsService } from './splits.service'
import { CreateSplitDto } from '@justsplitapp/types'

@ApiTags('splits')
@Controller('api/splits')
export class SplitsController {
  constructor(private readonly splitsService: SplitsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all splits' })
  findAll() {
    return this.splitsService.findAll()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new split' })
  @ApiResponse({ status: 201, description: 'The split has been successfully created.' })
  create(@Body() createSplitDto: CreateSplitDto) {
    return this.splitsService.create(createSplitDto)
  }
}
