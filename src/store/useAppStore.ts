import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface AppStore {
  selectedAppId: string | null
  selectedNodeId: string | null
  isMobilePanelOpen: boolean
  activeInspectorTab: string
  theme: Theme
  setSelectedAppId: (appId: string | null) => void
  setSelectedNodeId: (nodeId: string | null) => void
  setIsMobilePanelOpen: (open: boolean) => void
  setActiveInspectorTab: (tab: string) => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      selectedAppId: null,
      selectedNodeId: null,
      isMobilePanelOpen: false,
      activeInspectorTab: 'config',
      theme: 'dark',
      setSelectedAppId: (appId) => set({ selectedAppId: appId }),
      setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
      setIsMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
      setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
      setTheme: (theme) => {
        set({ theme })
        // Theme will be applied by useTheme hook
      },
      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        get().setTheme(newTheme)
      },
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)

