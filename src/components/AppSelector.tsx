import { Search, Plus } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useApps } from '@/hooks/useApps'
import { useAppStore } from '@/store/useAppStore'

export function AppSelector() {
  const { data: apps, isLoading, error } = useApps()
  const { selectedAppId, setSelectedAppId } = useAppStore()

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-2">
          <div className="h-10 bg-muted rounded" />
          <div className="h-20 bg-muted rounded" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-destructive text-sm">Failed to load apps</div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <div className="text-sm font-semibold">Application</div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8"
          />
        </div>
        <Button size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-1">
        {apps?.map((app) => (
          <button
            key={app.id}
            onClick={() => setSelectedAppId(app.id)}
            className={`w-full flex items-center gap-2 p-2 rounded-md text-left hover:bg-accent transition-colors ${
              selectedAppId === app.id ? 'bg-accent' : ''
            }`}
          >
            <span>{app.icon || '📦'}</span>
            <span className="text-sm flex-1">{app.name}</span>
            <span className="text-xs text-muted-foreground">→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

