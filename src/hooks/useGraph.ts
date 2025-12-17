import { useQuery } from '@tanstack/react-query'
import { mockApi } from '../api/mockApi'
import type { Graph } from '../types'

export function useGraph(appId: string | null) {
  return useQuery<Graph>({
    queryKey: ['graph', appId],
    queryFn: () => {
      if (!appId) throw new Error('App ID is required')
      return mockApi.getGraph(appId)
    },
    enabled: !!appId,
  })
}

