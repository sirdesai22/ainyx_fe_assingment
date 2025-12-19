import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select } from './ui/select'
import { Textarea } from './ui/textarea'
import { useReactFlow } from 'reactflow'
import { useSelectedAppId } from '@/store/useAppStore'
import type { NodeData, NodeType } from '@/types'

interface AddNodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddNodeDialog({ open, onOpenChange }: AddNodeDialogProps) {
  const { getViewport, addNodes } = useReactFlow()
  const selectedAppId = useSelectedAppId()
  
  const [formData, setFormData] = useState({
    label: '',
    nodeType: 'service' as NodeType,
    status: 'healthy' as 'healthy' | 'degraded' | 'down',
    description: '',
    cpu: 0.02,
    memory: '0.05 GB',
    disk: '10.00 GB',
    region: 1,
    cost: '$0.03/hr',
    value: 50,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.label.trim()) {
      return
    }

    const viewport = getViewport()
    const newNodeId = `node-${Date.now()}`
    
    const newNode: NodeData = {
      id: newNodeId,
      label: formData.label,
      nodeType: formData.nodeType,
      status: formData.status,
      value: formData.value,
      description: formData.description,
      cpu: formData.cpu,
      memory: formData.memory,
      disk: formData.disk,
      region: formData.region,
      cost: formData.cost,
    }

    // Calculate position in center of viewport
    const position = {
      x: (viewport.x * -1) + (window.innerWidth / 2) - 200,
      y: (viewport.y * -1) + (window.innerHeight / 2) - 150,
    }

    addNodes({
      id: newNodeId,
      type: formData.nodeType,
      position,
      data: newNode,
    })

    // Reset form
    setFormData({
      label: '',
      nodeType: 'service',
      status: 'healthy',
      description: '',
      cpu: 0.02,
      memory: '0.05 GB',
      disk: '10.00 GB',
      region: 1,
      cost: '$0.03/hr',
      value: 50,
    })

    onOpenChange(false)
  }

  if (!selectedAppId) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent onClose={() => onOpenChange(false)}>
          <DialogHeader>
            <DialogTitle>Add Node</DialogTitle>
            <DialogDescription>
              Please select an app first before adding a node.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Node</DialogTitle>
          <DialogDescription>
            Create a new service or database node in the graph.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Node Name *</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="Enter node name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nodeType">Node Type *</Label>
            <Select
              id="nodeType"
              value={formData.nodeType}
              onChange={(e) => setFormData({ ...formData, nodeType: e.target.value as NodeType })}
              required
            >
              <option value="service">Service</option>
              <option value="db">Database</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'healthy' | 'degraded' | 'down' })}
              required
            >
              <option value="healthy">Healthy</option>
              <option value="degraded">Degraded</option>
              <option value="down">Down</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpu">CPU</Label>
              <Input
                id="cpu"
                type="number"
                step="0.01"
                value={formData.cpu}
                onChange={(e) => setFormData({ ...formData, cpu: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memory">Memory (GB)</Label>
              <Input
                id="memory"
                type="text"
                value={formData.memory}
                onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
                placeholder="0.05 GB"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disk">Disk (GB)</Label>
              <Input
                id="disk"
                type="text"
                value={formData.disk}
                onChange={(e) => setFormData({ ...formData, disk: e.target.value })}
                placeholder="10.00 GB"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                type="number"
                min="1"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost per Hour</Label>
            <Input
              id="cost"
              type="text"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              placeholder="$0.03/hr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Initial Value (0-100)</Label>
            <Input
              id="value"
              type="number"
              min="0"
              max="100"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Node</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

