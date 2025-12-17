import { Github, Database, Box, Layers, Network } from 'lucide-react'

const navItems = [
  { icon: Github, label: 'GitHub' },
  { icon: Database, label: 'PostgreSQL' },
  { icon: Box, label: 'Redis' },
  { icon: Database, label: 'MongoDB' },
  { icon: Layers, label: 'Storage' },
  { icon: Network, label: 'Network' },
]

export function LeftRail() {
  return (
    <div className="w-16 border-r border-border bg-card flex flex-col items-center py-4 gap-4">
      {navItems.map((item, index) => {
        const Icon = item.icon
        return (
          <button
            key={index}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            title={item.label}
          >
            <Icon className="h-5 w-5 text-muted-foreground" />
          </button>
        )
      })}
    </div>
  )
}

