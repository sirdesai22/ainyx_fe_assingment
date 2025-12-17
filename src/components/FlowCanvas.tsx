import { useCallback, useEffect, useMemo } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
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
import { useAppStore } from '@/store/useAppStore'
import type { GraphNode, GraphEdge } from '@/types'

const nodeTypes: NodeTypes = {}

export function FlowCanvas() {
  const { selectedAppId, selectedNodeId, setSelectedNodeId, setIsMobilePanelOpen } = useAppStore()
  const { data: graph, isLoading, error } = useGraph(selectedAppId)
  const { fitView } = useReactFlow()

  const initialNodes: Node[] = useMemo(
    () =>
      graph?.nodes.map((node: GraphNode) => ({
        id: node.id,
        type: node.type,
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
          type: node.type,
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
        <div className="text-muted-foreground">Loading graph...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-destructive">Failed to load graph</div>
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
      <Background variant="dots" gap={12} size={1} />
      <Controls />
      <MiniMap />
    </ReactFlow>
  )
}

