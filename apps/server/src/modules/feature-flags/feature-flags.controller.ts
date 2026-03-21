import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { FeatureFlagsService } from './feature-flags.service'

@ApiTags('flags')
@Controller('api/flags')
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active feature flags' })
  getFeatureFlags() {
    return this.featureFlagsService.getFlags()
  }
}
