import { useCallback, useEffect, useMemo } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useGraph } from '@/hooks/useGraph'
import { useSelectedAppId, useSelectedNodeId, useAppActions } from '@/store/useAppStore'
import type { GraphNode, GraphEdge } from '@/types'
import ServiceNode from './nodes/ServiceNode'
import { Button } from './ui/button'

const nodeTypes: NodeTypes = {
  default: ServiceNode,
  service: ServiceNode,
  db: ServiceNode,
}

export function FlowCanvas() {
  const selectedAppId = useSelectedAppId()
  const selectedNodeId = useSelectedNodeId()
  const { setSelectedNodeId, setIsMobilePanelOpen } = useAppActions()
  const { data: graph, isLoading, error, refetch } = useGraph(selectedAppId)
  const { fitView } = useReactFlow()

  const initialNodes: Node[] = useMemo(
    () =>
      graph?.nodes.map((node: GraphNode) => ({
        id: node.id,
        type: node.data.nodeType || node.type || 'service',
        position: node.position,
        data: node.data,
        selected: selectedNodeId === node.id,
      })) || [],
    [graph?.nodes, selectedNodeId]
  )

  const initialEdges: Edge[] = useMemo(
    () =>
      graph?.edges.map((edge: GraphEdge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
      })) || [],
    [graph?.edges]
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    if (graph) {
      setNodes(
        graph.nodes.map((node: GraphNode) => ({
          id: node.id,
          type: node.data.nodeType || node.type || 'service',
          position: node.position,
          data: node.data,
          selected: selectedNodeId === node.id,
        }))
      )
      setEdges(
        graph.edges.map((edge: GraphEdge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
        }))
      )
    }
  }, [graph, setNodes, setEdges, selectedNodeId])

  useEffect(() => {
    if (nodes.length > 0) {
      setTimeout(() => fitView({ duration: 300 }), 100)
    }
  }, [nodes.length, fitView])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id)
      setIsMobilePanelOpen(true)
    },
    [setSelectedNodeId, setIsMobilePanelOpen]
  )

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null)
  }, [setSelectedNodeId])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNodeId) {
        event.preventDefault()
        setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId))
        setEdges((eds) =>
          eds.filter(
            (edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId
          )
        )
        setSelectedNodeId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedNodeId, setNodes, setEdges, setSelectedNodeId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <div className="text-muted-foreground">Loading graph...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3 text-center p-4">
          <div className="text-destructive text-lg font-semibold">Failed to load graph</div>
          <div className="text-muted-foreground text-sm">
            {error instanceof Error ? error.message : 'An error occurred'}
          </div>
          <Button
            variant="outline"
            onClick={() => {
              // Refetch on error
              if (selectedAppId) {
                refetch()
              }
            }}
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!graph || graph.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">No graph data available</div>
      </div>
    )
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background gap={12} size={1} />
      <Controls />
    </ReactFlow>
  )
}

