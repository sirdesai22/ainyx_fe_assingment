import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'

type Theme = 'light' | 'dark'

// UI State - minimal and well-structured
interface UIState {
  selectedAppId: string | null
  selectedNodeId: string | null
  isMobilePanelOpen: boolean
  activeInspectorTab: string
}

// Theme State
interface ThemeState {
  theme: Theme
}

// Actions
interface UIActions {
  setSelectedAppId: (appId: string | null) => void
  setSelectedNodeId: (nodeId: string | null) => void
  setIsMobilePanelOpen: (open: boolean) => void
  setActiveInspectorTab: (tab: string) => void
}

interface ThemeActions {
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// Combined Store
interface AppStore extends UIState, ThemeState, UIActions, ThemeActions {}

// Store implementation
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // UI State
      selectedAppId: null,
      selectedNodeId: null,
      isMobilePanelOpen: false,
      activeInspectorTab: 'config',
      
      // Theme State
      theme: 'dark',
      
      // UI Actions
      setSelectedAppId: (appId) => set({ selectedAppId: appId }),
      setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
      setIsMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
      setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
      
      // Theme Actions
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

// Selectors for derived data and optimized access
export const useSelectedAppId = () => useAppStore((state) => state.selectedAppId)
export const useSelectedNodeId = () => useAppStore((state) => state.selectedNodeId)
export const useIsMobilePanelOpen = () => useAppStore((state) => state.isMobilePanelOpen)
export const useActiveInspectorTab = () => useAppStore((state) => state.activeInspectorTab)
export const useThemeState = () => useAppStore((state) => state.theme)

// Action selectors
export const useAppActions = () =>
  useAppStore(
    (state) => ({
      setSelectedAppId: state.setSelectedAppId,
      setSelectedNodeId: state.setSelectedNodeId,
      setIsMobilePanelOpen: state.setIsMobilePanelOpen,
      setActiveInspectorTab: state.setActiveInspectorTab,
    }),
    shallow
  )

export const useThemeActions = () =>
  useAppStore(
    (state) => ({
      setTheme: state.setTheme,
      toggleTheme: state.toggleTheme,
    }),
    shallow
  )

// Derived selectors
export const useHasSelectedNode = () => useAppStore((state) => state.selectedNodeId !== null)
export const useHasSelectedApp = () => useAppStore((state) => state.selectedAppId !== null)

