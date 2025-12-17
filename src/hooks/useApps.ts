import { useQuery } from '@tanstack/react-query'
import { mockApi } from '../api/mockApi'
import type { App } from '../types'

export function useApps() {
  return useQuery<App[]>({
    queryKey: ['apps'],
    queryFn: () => mockApi.getApps(),
  })
}

