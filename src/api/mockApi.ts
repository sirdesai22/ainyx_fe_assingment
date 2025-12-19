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
        position: { x: 350, y: 600 },
        data: {
          id: 'node-1',
          label: 'Postgres',
          nodeType: 'db',
          status: 'healthy',
          value: 20,
          description: 'PostgreSQL database service',
          cpu: 0.38,
          memory: '4.05 GB',
          disk: '50.00 GB',
          region: 1,
          cost: '$0.03/hr',
        },
      },
      {
        id: 'node-2',
        type: 'default',
        position: { x: 50, y: 250 },
        data: {
          id: 'node-2',
          label: 'Redis',
          nodeType: 'db',
          status: 'degraded',
          value: 15,
          description: 'Redis cache service',
          cpu: 0.72,
          memory: '7.05 GB',
          disk: '70.00 GB',
          region: 3,
          cost: '$0.03/hr',
        },
      },
      {
        id: 'node-3',
        type: 'default',
        position: { x: 700, y: 250 },
        data: {
          id: 'node-3',
          label: 'MongoDB',
          nodeType: 'db',
          status: 'down',
          value: 10,
          description: 'MongoDB database service',
          cpu: 0.88,
          memory: '8.00 GB',
          disk: '18.00 GB',
          region: 2,
          cost: '$0.03/hr',
        },
      },
      {
        id: 'node-4',
        type: 'default',
        position: { x: 400, y: -100 },
        data: {
          id: 'node-4',
          label: 'Auth Service',
          nodeType: 'service',
          status: 'healthy',
          value: 40,
          description: 'JWT authentication microservice',
          cpu: 0.12,
          memory: '1.25 GB',
          disk: '10.00 GB',
          region: 2,
          cost: '$0.07/hr',
        },
      },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-1', target: 'node-3' },
      { id: 'edge-3', source: 'node-4', target: 'node-1' },
    ],
  },
  '2': {
    nodes: [
      {
        id: 'node-1',
        type: 'default',
        position: { x: 200, y: 350 },
        data: {
          id: 'node-1',
          label: 'Service A',
          nodeType: 'service',
          status: 'healthy',
          value: 50,
          description: 'Main service',
          cpu: 0.05,
          memory: '0.10 GB',
          disk: '20.00 GB',
          region: 2,
          cost: '$0.05/hr',
        },
      },
      {
        id: 'node-2',
        type: 'default',
        position: { x: 350, y: 250 },
        data: {
          id: 'node-2',
          label: 'Service B',
          nodeType: 'service',
          status: 'healthy',
          value: 30,
          description: 'Secondary service',
          cpu: 0.03,
          memory: '0.08 GB',
          disk: '15.00 GB',
          region: 1,
          cost: '$0.04/hr',
        },
      },
    ],
    edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
  },
  '3': {
    nodes: [
      {
        id: 'node-1',
        type: 'default',
        position: { x: 300, y: 400 },
        data: {
          id: 'node-1',
          label: 'API Gateway',
          nodeType: 'service',
          status: 'healthy',
          value: 75,
          description: 'API Gateway service',
          cpu: 0.08,
          memory: '0.15 GB',
          disk: '25.00 GB',
          region: 3,
          cost: '$0.08/hr',
        },
      },
      {
        id: 'node-2',
        type: 'default',
        position: { x: 100, y: 200 },
        data: {
          id: 'node-2',
          label: 'Auth Service',
          nodeType: 'service',
          status: 'healthy',
          value: 60,
          description: 'Authentication service',
          cpu: 0.06,
          memory: '0.12 GB',
          disk: '18.00 GB',
          region: 2,
          cost: '$0.06/hr',
        },
      },
      {
        id: 'node-3',
        type: 'default',
        position: { x: 500, y: 200 },
        data: {
          id: 'node-3',
          label: 'User Service',
          nodeType: 'service',
          status: 'degraded',
          value: 45,
          description: 'User management service',
          cpu: 0.04,
          memory: '0.10 GB',
          disk: '15.00 GB',
          region: 1,
          cost: '$0.04/hr',
        },
      },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-1', target: 'node-3' },
    ],
  },
  '4': {
    nodes: [
      {
        id: 'node-1',
        type: 'default',
        position: { x: 250, y: 300 },
        data: {
          id: 'node-1',
          label: 'Web Server',
          nodeType: 'service',
          status: 'healthy',
          value: 80,
          description: 'Web server instance',
          cpu: 0.10,
          memory: '0.20 GB',
          disk: '30.00 GB',
          region: 2,
          cost: '$0.10/hr',
        },
      },
      {
        id: 'node-2',
        type: 'default',
        position: { x: 450, y: 300 },
        data: {
          id: 'node-2',
          label: 'Load Balancer',
          nodeType: 'service',
          status: 'healthy',
          value: 65,
          description: 'Load balancer service',
          cpu: 0.07,
          memory: '0.14 GB',
          disk: '22.00 GB',
          region: 3,
          cost: '$0.07/hr',
        },
      },
    ],
    edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
  },
  '5': {
    nodes: [
      {
        id: 'node-1',
        type: 'default',
        position: { x: 350, y: 500 },
        data: {
          id: 'node-1',
          label: 'Message Queue',
          nodeType: 'service',
          status: 'healthy',
          value: 55,
          description: 'Message queue service',
          cpu: 0.05,
          memory: '0.11 GB',
          disk: '20.00 GB',
          region: 1,
          cost: '$0.05/hr',
        },
      },
      {
        id: 'node-2',
        type: 'default',
        position: { x: 150, y: 250 },
        data: {
          id: 'node-2',
          label: 'Worker Service',
          nodeType: 'service',
          status: 'degraded',
          value: 40,
          description: 'Background worker service',
          cpu: 0.03,
          memory: '0.09 GB',
          disk: '16.00 GB',
          region: 1,
          cost: '$0.03/hr',
        },
      },
      {
        id: 'node-3',
        type: 'default',
        position: { x: 550, y: 250 },
        data: {
          id: 'node-3',
          label: 'Cache Layer',
          nodeType: 'service',
          status: 'healthy',
          value: 70,
          description: 'Caching service',
          cpu: 0.06,
          memory: '0.13 GB',
          disk: '19.00 GB',
          region: 2,
          cost: '$0.06/hr',
        },
      },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-1', target: 'node-3' },
    ],
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

