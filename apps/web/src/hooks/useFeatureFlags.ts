import { useQuery } from '@tanstack/react-query'
import { FeatureFlags } from '@justsplitapp/types'

export function useFeatureFlags() {
  return useQuery<FeatureFlags>({
    queryKey: ['feature-flags'],
    queryFn: async () => {
      const flagsString = import.meta.env.VITE_FEATURE_FLAGS || 'recommendations:true,ocr:true,chat:true'
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
    },
    staleTime: Infinity,
  })
}
