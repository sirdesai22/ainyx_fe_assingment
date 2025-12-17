import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function useTheme() {
  const { theme, setTheme } = useAppStore()

  useEffect(() => {
    // Apply theme on mount and when it changes
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  // Initialize theme on mount
  useEffect(() => {
    const root = document.documentElement
    // Check if theme is already set, otherwise use stored theme
    if (!root.classList.contains('light') && !root.classList.contains('dark')) {
      root.classList.add(theme)
    }
  }, [])

  return { theme, setTheme }
}

