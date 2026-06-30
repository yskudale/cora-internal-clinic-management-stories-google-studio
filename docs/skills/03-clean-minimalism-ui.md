# Project Skill: UI/UX "Clean Minimalism" Design Theme

## Purpose
To define the visual hierarchy, color palettes, spacing systems, and components for the "Clean Minimalism" theme. This ensures a consistent, aesthetic, and accessible user experience across all modules of the application.

## Scope of Application
To be applied when styling layouts, cards, buttons, text fields, tables, lists, and modal interfaces.

---

## Design Core Tokens

```
========================================================================
  TOKEN                VALUE / TW CLASS
========================================================================
  Primary Color        Indigo (indigo-600 / bg-indigo-600)
  Background Color     Slate (slate-50 / bg-slate-50)
  Surface Background   White (bg-white)
  Border Color         Slate (border-slate-200)
  Text Base            Slate (text-slate-900)
  Text Muted           Slate (text-slate-500)
  Active Accent        Indigo (bg-indigo-50 text-indigo-700)
  Border Radius        Rounded-xl (rounded-xl), Rounded-md (rounded-md)
  Shadow Scale         Shadow-sm (shadow-sm), Shadow-xl (shadow-xl)
========================================================================
```

---

## Component Specifications

### 1. Main App Shell Layout
The app shell is structured as a two-column grid using full-viewport heights:
- **Left Column**: Sidebar navigation (`w-64 bg-white border-r border-slate-200`).
- **Right Column**: Main display column (`flex-1 flex flex-col`).
  - **Header**: Fixed height (`h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm`).
  - **Main Content**: Scrollable container (`flex-1 p-8 overflow-y-auto bg-slate-50`).

### 2. Sidebar Navigation Items
Items should be styled as clean blocks with subtle hover and active indicators:
- **Inactive**: `flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md transition-colors text-sm`
- **Active**: `flex items-center gap-3 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-md font-medium text-sm`

### 3. Cards & Information Containers
Cards are styled with light slate borders and very soft shadows. No large gradient fills:
- Class: `bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md`

### 4. Interactive Elements (Buttons)
- **Primary Action**: `bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors text-sm`
- **Secondary Action**: `bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium py-2 px-4 rounded-md transition-colors text-sm`
- **Danger Action**: `bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-md transition-colors text-sm`

### 5. Data Tables
Tables should look lightweight and focus on data density:
- **Header**: `text-[10px] uppercase text-slate-400 border-b border-slate-100 px-6 py-3 font-semibold tracking-wider`
- **Rows**: `border-b border-slate-50 hover:bg-slate-50/50 transition-colors`
- **Cell Padding**: `px-6 py-4`
- **Status Badges**:
  - *Waiting/Pending*: `px-2 py-1 bg-yellow-50 text-yellow-600 rounded text-xs font-medium`
  - *In Session/Active*: `px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-medium`
  - *Completed/Settled*: `px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs font-medium`
  - *Emergency/Danger*: `px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-medium`

---

## Do's and Don'ts

### DO
- ✅ Rely on rich whitespace (generous margins, clean padding) to group elements instead of relying on thick black lines.
- ✅ Align all content to a consistent base grid (e.g. padding of 4, 6, 8 units).
- ✅ Limit high-contrast colors (like indigo or red) strictly to functional focal points (actions, status indicators).

### DON'T
- ❌ Do not use aggressive linear gradients or heavy drop shadows (shadow-2xl) on standard interface cards.
- ❌ Do not create high-contrast dark modes unless explicitly requested. Keep the UI clean, neutral, and light.
- ❌ Do not cram data fields into dense blocks. Respect readability and type tracking.

## Dependencies on Other Skills
- Applied to: `02-react-engineering.md`, `07-architecture-structure.md`
