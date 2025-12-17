import type { App, Graph } from '../types'

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockApps: App[] = [
  { id: '1', name: 'supertokens-golang', icon: '💡' },
  { id: '2', name: 'supertokens-java', icon: '⚙️' },
  { id: '3', name: 'supertokens-python', icon: '🚀' },
  { id: '4', name: 'supertokens-ruby', icon: '💜' },
  { id: '5', name: 'supertokens-go', icon: '⭐' },
]

const mockGraphs: Record<string, Graph> = {
  '1': {
    nodes: [
      {
        id: 'node-1',
        type: 'default',
        position: { x: 250, y: 100 },
        data: {
          id: 'node-1',
          label: 'Postgres',
          status: 'healthy',
          value: 20,
          description: 'PostgreSQL database service',
        },
      },
      {
        id: 'node-2',
        type: 'default',
        position: { x: 100, y: 250 },
        data: {
          id: 'node-2',
          label: 'Redis',
          status: 'degraded',
          value: 15,
          description: 'Redis cache service',
        },
      },
      {
        id: 'node-3',
        type: 'default',
        position: { x: 400, y: 250 },
        data: {
          id: 'node-3',
          label: 'MongoDB',
          status: 'down',
          value: 10,
          description: 'MongoDB database service',
        },
      },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-1', target: 'node-3' },
    ],
  },
  '2': {
    nodes: [
      {
        id: 'node-1',
        type: 'default',
        position: { x: 200, y: 150 },
        data: {
          id: 'node-1',
          label: 'Service A',
          status: 'healthy',
          value: 50,
          description: 'Main service',
        },
      },
      {
        id: 'node-2',
        type: 'default',
        position: { x: 350, y: 150 },
        data: {
          id: 'node-2',
          label: 'Service B',
          status: 'healthy',
          value: 30,
          description: 'Secondary service',
        },
      },
    ],
    edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
  },
}

let shouldError = false

export const mockApi = {
  toggleError: () => {
    shouldError = !shouldError
  },
  getShouldError: () => shouldError,

  getApps: async (): Promise<App[]> => {
    await delay(500)
    if (shouldError) {
      throw new Error('Failed to fetch apps')
    }
    return mockApps
  },

  getGraph: async (appId: string): Promise<Graph> => {
    await delay(800)
    if (shouldError) {
      throw new Error('Failed to fetch graph')
    }
    const graph = mockGraphs[appId] || mockGraphs['1']
    return graph
  },
}

