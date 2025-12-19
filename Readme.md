# ReactFlow Canvas - App Graph Builder

A responsive ReactFlow-based application graph builder UI built with React, TypeScript, and modern tooling.

## Features

- **Layout Composition**: Top bar, left rail, right panel, and dotted canvas
- **ReactFlow Integration**: Interactive graph with nodes, edges, drag, select, delete, zoom, and pan
- **Node Inspector**: Service node inspector with status pills, tabs, and synced slider/input controls
- **TanStack Query**: Mock API integration with loading and error states
- **Zustand State Management**: Centralized state for app/node selection and UI state
- **Responsive Design**: Mobile drawer for right panel on small screens
- **Theme Support**: Light and dark mode with persistent theme preference
- **TypeScript Strict Mode**: Full type safety throughout the application

## Tech Stack

- **React 18** + **Vite**
- **TypeScript** (strict mode)
- **ReactFlow (xyflow)** v11
- **shadcn/ui** components (built with Radix UI)
- **TanStack Query** v5
- **Zustand** v4
- **Tailwind CSS**

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

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
├── api/              # Mock API handlers
│   └── mockApi.ts   # In-memory API with simulated latency
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── nodes/       # Custom ReactFlow node components
│   └── ...          # Layout and feature components
├── hooks/           # Custom React hooks
│   ├── useApps.ts   # TanStack Query hook for apps
│   ├── useGraph.ts  # TanStack Query hook for graph data
│   └── useTheme.ts  # Theme management hook
├── lib/             # Utility functions
│   └── utils.ts     # cn() helper for className merging
├── store/           # Zustand store
│   └── useAppStore.ts # Global app state
├── types/           # TypeScript type definitions
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles and theme variables
```

## Key Decisions

### 1. **Mock API Approach**
- **Decision**: Used simple Promise-based mock API with `setTimeout` instead of MSW
- **Rationale**: Simpler setup, no service worker complexity, sufficient for demonstration
- **Implementation**: `src/api/mockApi.ts` with simulated 500-800ms latency

### 2. **State Management Architecture**
- **Decision**: Zustand for UI state, TanStack Query for server state
- **Rationale**: Clear separation of concerns, optimized re-renders with selectors
- **Implementation**: 
  - Zustand store with selectors for minimal subscriptions
  - TanStack Query with proper caching (5min staleTime, 10min gcTime)

### 3. **Component Architecture**
- **Decision**: Separated layout components from feature components
- **Rationale**: Better maintainability and testability
- **Structure**: 
  - Layout: `TopBar`, `LeftRail`, `RightPanel`
  - Features: `FlowCanvas`, `NodeInspector`, `AppSelector`
  - Custom Nodes: `ServiceNode` with shadcn/ui components

### 4. **Custom Node Implementation**
- **Decision**: Built custom ServiceNode using shadcn/ui Card, Tabs, Slider components
- **Rationale**: Consistent design system, better UX with proper event handling
- **Features**: 
  - Prevents node selection when interacting with internal controls
  - Dynamic slider based on active tab (CPU/Memory/Disk/Region)
  - Real-time data synchronization

### 5. **Theme Management**
- **Decision**: Zustand persist middleware for theme preference
- **Rationale**: Simple persistence, no additional dependencies
- **Implementation**: Theme stored in localStorage, applied on mount to prevent flash

### 6. **Responsive Design**
- **Decision**: Desktop inline panel, mobile slide-over drawer
- **Rationale**: Better UX on different screen sizes
- **Implementation**: Zustand-managed `isMobilePanelOpen` state with Sheet component

### 7. **TypeScript Configuration**
- **Decision**: Strict mode enabled with comprehensive type definitions
- **Rationale**: Catch errors early, better developer experience
- **Implementation**: All components and hooks fully typed

## Known Limitations

1. **Mock API Persistence**
   - Changes to node data are not persisted across page refreshes
   - Mock data resets to initial state on reload
   - **Workaround**: Consider adding localStorage persistence for node edits

2. **Error Simulation**
   - Error toggle button exists in TopBar but requires manual activation
   - No automatic error simulation for testing
   - **Note**: Error state can be toggled via the AlertCircle icon in TopBar

3. **Node Deletion**
   - No confirmation dialog before deleting nodes
   - Deletion is immediate on Delete/Backspace key press
   - **Future**: Add confirmation modal for better UX

4. **Mobile Drawer**
   - Basic slide-over implementation
   - Could benefit from better animations and backdrop interactions
   - **Future**: Enhance with smoother transitions

5. **Graph Data**
   - Limited to 5 predefined apps with static graph data
   - No ability to create new apps or nodes via UI (only via code)
   - **Future**: Add "Add Node" and "Add App" functionality

6. **Tab-Based Slider**
   - Slider value conversion between different metric types (CPU, Memory, Disk, Region) uses scaling factors
   - May not perfectly represent all metric ranges
   - **Note**: Slider updates the corresponding field in node data when changed

7. **Edge Handling**
   - Edges are rendered but connection handles are hidden
   - No visual indication of connection points
   - **Future**: Show handles on hover or when node is selected

8. **Performance**
   - No virtualization for large graphs (though not needed for current use case)
   - All nodes render simultaneously
   - **Note**: Current implementation handles 3-5 nodes efficiently

## Functional Requirements Status

✅ Layout: top bar, left rail, right panel, dotted canvas  
✅ Responsive: right panel becomes a mobile drawer  
✅ ReactFlow: 3+ nodes, drag, select, delete (Delete/Backspace), zoom/pan, fit view  
✅ Node inspector: tabs + status pill + synced slider/input  
✅ TanStack Query: mock /apps and /apps/:appId/graph + loading/error  
✅ Zustand: selected app/node, mobile panel open, active tab  
✅ TypeScript strict + linting + scripts  
✅ Theme support: light/dark mode with persistence  
✅ Custom node UI: shadcn/ui components with proper event handling  

## Development

The project uses:
- **Vite** for fast development and building
- **ESLint** for code linting with React and TypeScript rules
- **TypeScript** with strict mode enabled
- **Tailwind CSS** for styling with CSS variables for theming

All scripts are defined in `package.json` and follow standard npm conventions.

## Browser Support

- Modern browsers with ES2020 support
- Chrome, Firefox, Safari, Edge (latest versions)

