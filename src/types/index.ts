export interface App {
  id: string
  name: string
  icon?: string
}

export type NodeType = 'service' | 'db'

export interface NodeData {
  id: string
  label: string
  nodeType: NodeType // 'service' or 'db'
  status: 'healthy' | 'degraded' | 'down'
  value: number // Slider value (0-100)
  description?: string
  // Resource metrics
  cpu: number // CPU value (e.g., 0.02)
  memory: string // Memory in GB (e.g., "0.05 GB")
  disk: string // Disk in GB (e.g., "10.00 GB")
  region: number // Region count (e.g., 1)
  cost: string // Cost per hour (e.g., "$0.03/hr")
}

export interface GraphNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: NodeData
}

export interface GraphEdge {
  id: string
  source: string
  target: string
}

export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

