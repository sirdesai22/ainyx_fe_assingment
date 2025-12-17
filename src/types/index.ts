export interface App {
  id: string
  name: string
  icon?: string
}

export interface NodeData {
  id: string
  label: string
  status: 'healthy' | 'degraded' | 'down'
  value: number
  description?: string
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

