import { Injectable } from '@nestjs/common'

export interface FeatureFlags {
  recommendations: boolean
  ocr: boolean
  chat: boolean
}

@Injectable()
export class FeatureFlagsService {
  private flags: FeatureFlags

  constructor() {
    this.flags = this.parseFlags(process.env.FEATURE_FLAGS || 'recommendations:true,ocr:true,chat:true')
  }

  private parseFlags(flagsString: string): FeatureFlags {
    const flags: FeatureFlags = {
      recommendations: true,
      ocr: true,
      chat: true,
    }

    flagsString.split(',').forEach((flag) => {
      const [key, value] = flag.split(':')
      if (key in flags) {
        flags[key as keyof FeatureFlags] = value === 'true'
      }
    })

    return flags
  }

  getFlags(): FeatureFlags {
    return this.flags
  }

  isFlagEnabled(flag: keyof FeatureFlags): boolean {
    return this.flags[flag]
  }
}
