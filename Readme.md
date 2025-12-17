# ReactFlow Canvas - App Graph Builder

A responsive ReactFlow-based application graph builder UI built with React, TypeScript, and modern tooling.

## Features

- **Layout Composition**: Top bar, left rail, right panel, and dotted canvas
- **ReactFlow Integration**: Interactive graph with nodes, edges, drag, select, delete, zoom, and pan
- **Node Inspector**: Service node inspector with status pills, tabs, and synced slider/input controls
- **TanStack Query**: Mock API integration with loading and error states
- **Zustand State Management**: Centralized state for app/node selection and UI state
- **Responsive Design**: Mobile drawer for right panel on small screens
- **TypeScript Strict Mode**: Full type safety throughout the application

## Tech Stack

- **React 18** + **Vite**
- **TypeScript** (strict mode)
- **ReactFlow (xyflow)** v11
- **shadcn/ui** components
- **TanStack Query** v5
- **Zustand** v4
- **Tailwind CSS**

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

5. **Type checking:**
   ```bash
   npm run typecheck
   ```

6. **Linting:**
   ```bash
   npm run lint
   ```

## Project Structure

```
src/
├── api/           # Mock API handlers
├── components/    # React components
│   ├── ui/       # shadcn/ui components
│   └── ...       # Layout and feature components
├── hooks/        # Custom React hooks (TanStack Query)
├── lib/          # Utility functions
├── store/        # Zustand store
├── types/        # TypeScript type definitions
├── App.tsx       # Main app component
├── main.tsx      # Entry point
└── index.css     # Global styles
```

## Key Decisions

1. **Mock API**: Simple Promise-based mock API with simulated latency instead of MSW for simplicity
2. **State Management**: Zustand for UI state, TanStack Query for server state
3. **Component Architecture**: Separated layout components (TopBar, LeftRail, RightPanel) from feature components (FlowCanvas, NodeInspector)
4. **Responsive Design**: Desktop shows right panel inline, mobile uses a slide-over drawer
5. **ReactFlow Integration**: Used ReactFlowProvider to enable hooks throughout the component tree

## Functional Requirements

✅ Layout: top bar, left rail, right panel, dotted canvas  
✅ Responsive: right panel becomes a mobile drawer  
✅ ReactFlow: 3 nodes, drag, select, delete (Delete/Backspace), zoom/pan  
✅ Node inspector: tabs + status pill + synced slider/input  
✅ TanStack Query: mock /apps and /apps/:appId/graph + loading/error  
✅ Zustand: selected app/node, mobile panel open, active tab  
✅ TypeScript strict + linting + scripts  

## Known Limitations

- Mock API doesn't persist changes (resets on refresh)
- Error simulation requires manual toggle in mockApi (not exposed in UI)
- Mobile drawer could be improved with better animations
- Node deletion doesn't show confirmation dialog
- Fit view button uses DOM event listener (could be improved with React context)

## Future Enhancements (Bonus Features)

- Add "Add Node" button to create new service nodes
- Support multiple node types (Service vs DB) with different styling
- Keyboard shortcuts (Fit view, toggle panel)
- Persist graph state to localStorage
- Dark mode toggle functionality

## Development

The project uses:
- **Vite** for fast development and building
- **ESLint** for code linting
- **TypeScript** with strict mode enabled
- **Tailwind CSS** for styling

All scripts are defined in `package.json` and follow standard npm conventions.
