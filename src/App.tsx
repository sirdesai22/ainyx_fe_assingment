import { useEffect } from 'react'
import { ReactFlowProvider } from 'reactflow'
import { TopBar } from './components/TopBar'
import { LeftRail } from './components/LeftRail'
import { RightPanel } from './components/RightPanel'
import { FlowCanvas } from './components/FlowCanvas'
import { useAppStore } from './store/useAppStore'
import { useApps } from './hooks/useApps'
import { Menu } from 'lucide-react'
import { Button } from './components/ui/button'

function App() {
  const { data: apps } = useApps()
  const { selectedAppId, setSelectedAppId, setIsMobilePanelOpen } = useAppStore()

  useEffect(() => {
    if (apps && apps.length > 0 && !selectedAppId) {
      setSelectedAppId(apps[0].id)
    }
  }, [apps, selectedAppId, setSelectedAppId])

  return (
    <ReactFlowProvider>
      <div className="h-screen w-screen flex flex-col bg-background">
        <TopBar />
        <div className="flex-1 flex overflow-hidden">
          <LeftRail />
          <div className="flex-1 relative">
            <FlowCanvas />
          </div>
          <RightPanel />
        </div>
        {/* Mobile menu button */}
        <Button
          className="md:hidden fixed bottom-4 right-4 z-50"
          size="icon"
          onClick={() => setIsMobilePanelOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </ReactFlowProvider>
  )
}

export default App

