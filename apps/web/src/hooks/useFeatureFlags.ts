import { useQuery } from '@tanstack/react-query'

interface FeatureFlags {
  recommendations: boolean
  ocr: boolean
  chat: boolean
  mockMode: boolean
}

export function useFeatureFlags() {
  return useQuery<FeatureFlags>({
    queryKey: ['feature-flags'],
    queryFn: async () => {
      const flagsString = import.meta.env.VITE_FEATURE_FLAGS || 'recommendations:true,ocr:true,chat:true,mockMode:true'
      const flags: FeatureFlags = {
        recommendations: true,
        ocr: true,
        chat: true,
        mockMode: true,
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
