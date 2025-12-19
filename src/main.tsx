import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// Initialize theme from localStorage before render to prevent flash
const storedTheme = localStorage.getItem('app-storage')
if (storedTheme) {
  try {
    const parsed = JSON.parse(storedTheme)
    if (parsed.state?.theme) {
      document.documentElement.classList.add(parsed.state.theme)
    } else {
      document.documentElement.classList.add('dark')
    }
  } catch {
    document.documentElement.classList.add('dark')
  }
} else {
  document.documentElement.classList.add('dark')
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes - cache results
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)

