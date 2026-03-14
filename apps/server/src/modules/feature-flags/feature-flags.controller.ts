import { Controller, Get, CacheInterceptor, UseInterceptors } from '@nestjs/common'
import { FeatureFlagsService } from './feature-flags.service'

@UseInterceptors(CacheInterceptor)
@Controller('api/flags')
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  @Get()
  getFeatureFlags() {
    return this.featureFlagsService.getFlags()
  }
}
