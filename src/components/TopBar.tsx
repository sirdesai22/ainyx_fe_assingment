import { Search, Settings, Moon, User, Maximize2 } from 'lucide-react'
import { Button } from './ui/button'
import { useAppStore } from '@/store/useAppStore'
import { useApps } from '@/hooks/useApps'
import { useReactFlow } from 'reactflow'

export function TopBar() {
  const { selectedAppId, setSelectedAppId } = useAppStore()
  const { data: apps } = useApps()
  const { fitView } = useReactFlow()

  const handleFitView = () => {
    fitView({ duration: 300 })
  }

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="text-xl font-bold">App Graph Builder</div>
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <select
            value={selectedAppId || ''}
            onChange={(e) => setSelectedAppId(e.target.value || null)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm flex-1"
          >
            <option value="">Select app...</option>
            {apps?.map((app) => (
              <option key={app.id} value={app.id}>
                {app.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" title="Fit View" onClick={handleFitView}>
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Settings">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Theme">
          <Moon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Profile">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

