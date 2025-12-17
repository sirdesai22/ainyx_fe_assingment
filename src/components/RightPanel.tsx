import { AppSelector } from './AppSelector'
import { NodeInspector } from './NodeInspector'
import { useAppStore } from '@/store/useAppStore'
import { Sheet, SheetContent, SheetClose } from './ui/sheet'

export function RightPanel() {
  const { selectedNodeId, isMobilePanelOpen, setIsMobilePanelOpen } = useAppStore()

  const panelContent = (
    <div className="h-full flex flex-col border-l border-border bg-card">
      <div className="flex-1 overflow-y-auto">
        {selectedNodeId ? <NodeInspector /> : <AppSelector />}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block w-80 h-full">
        {panelContent}
      </div>

      {/* Mobile view */}
      <Sheet open={isMobilePanelOpen} onOpenChange={setIsMobilePanelOpen} side="right">
        <SheetContent>
          <SheetClose onClose={() => setIsMobilePanelOpen(false)} />
          {panelContent}
        </SheetContent>
      </Sheet>
    </>
  )
}

