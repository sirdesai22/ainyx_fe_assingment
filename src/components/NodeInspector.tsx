import { useState, useEffect } from 'react'
import { Badge } from './ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Slider } from './ui/slider'
import { useSelectedNodeId, useActiveInspectorTab, useAppActions } from '@/store/useAppStore'
import { useReactFlow } from 'reactflow'
import type { NodeData } from '@/types'

export function NodeInspector() {
  const selectedNodeId = useSelectedNodeId()
  const activeInspectorTab = useActiveInspectorTab()
  const { setActiveInspectorTab } = useAppActions()
  const { getNode, setNodes } = useReactFlow()

  const node = selectedNodeId ? getNode(selectedNodeId) : null
  const nodeData = node?.data as NodeData | undefined

  const [name, setName] = useState(nodeData?.label || '')
  const [description, setDescription] = useState(nodeData?.description || '')
  const [value, setValue] = useState(nodeData?.value || 0)

  useEffect(() => {
    if (nodeData) {
      setName(nodeData.label || '')
      setDescription(nodeData.description || '')
      setValue(nodeData.value || 0)
    }
  }, [nodeData])

  const updateNodeData = (updates: Partial<NodeData>) => {
    if (!selectedNodeId) return

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updates,
            },
          }
        }
        return node
      })
    )
  }

  const handleNameChange = (newName: string) => {
    setName(newName)
    updateNodeData({ label: newName })
  }

  const handleDescriptionChange = (newDesc: string) => {
    setDescription(newDesc)
    updateNodeData({ description: newDesc })
  }

  const handleValueChange = (newValue: number) => {
    setValue(newValue)
    updateNodeData({ value: newValue })
  }

  if (!node || !nodeData) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Select a node to inspect
      </div>
    )
  }

  const statusVariant =
    nodeData.status === 'healthy'
      ? 'healthy'
      : nodeData.status === 'degraded'
      ? 'degraded'
      : 'down'

  const statusLabel =
    nodeData.status === 'healthy'
      ? 'Healthy'
      : nodeData.status === 'degraded'
      ? 'Degraded'
      : 'Down'

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-semibold">Service Node</div>
        <Badge variant={statusVariant as 'default' | 'secondary' | 'destructive' | 'outline'}>{statusLabel}</Badge>
      </div>

      <Tabs value={activeInspectorTab} onValueChange={setActiveInspectorTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Node Name</label>
            <Input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter node name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Value</label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={value}
                  onChange={(e) => handleValueChange(Number(e.target.value))}
                  className="w-20"
                />
              </div>
              <Slider
                value={[value]}
                onValueChange={(value) => handleValueChange(value[0])}
                min={0}
                max={100}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

