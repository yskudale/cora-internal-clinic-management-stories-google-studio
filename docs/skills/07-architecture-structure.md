# Project Skill: Architecture & Folder Structure

## Purpose
To enforce a clean, decoupled, modular feature-slice directory structure. This ensures maintainability, prevents circular dependency rings, and allows developers to locate files quickly across a large-scale system.

## Scope of Application
To be applied when creating new files, features, directories, and relative imports.

---

## Workspace Directory Structure

All files under `src/` must align with this architectural classification:

```text
src/
├── api/                        # Canonical API client layer
│   ├── client.ts               # Shared Ky instance and global error hooks
│   └── types.ts                # Shared TypeScript types, interfaces, enums
├── components/                 # Reusable shared UI primitives (dumb components)
│   ├── form/                   # TextInput, Checkbox, SelectInput, DatePicker
│   ├── feedback/               # LoadingSpinner, Toast, Alert, ErrorFallback
│   └── table/                  # DataTable with TanStack Table v9
├── features/                   # Core modular business domains (smart slices)
│   ├── e0-foundation/          # Foundation slice (Login, NotAuthorized, etc.)
│   ├── e1-patients/            # Patient Management slice
│   ├── e2-booking/             # Channel Booking & Appointment slice
│   └── e13-admin/              # Administration configuration slice
├── router/                     # Navigation and routing mappings
│   └── index.tsx               # Browser router setup with lazy-loaded route layouts
├── store/                      # Global state stores
│   ├── authStore.ts            # User session, role, and privileges
│   └── patientStore.ts         # In-memory patient navigation context
├── test/                       # Global testing configurations and JSDOM wrappers
│   └── setup.ts                # Testing setup file
├── App.tsx                     # App entry router mount
├── index.css                   # Tailwind CSS global entry
└── main.tsx                    # React DOM 19 app mount
```

---

## Architecture Boundaries & Rules

### 1. The Pure Primitive Rule (`src/components/`)
Shared components inside `src/components/` must remain pure:
- They must accept inputs strictly via `props` and emit actions via callbacks.
- They must never import from global state stores (`authStore`, `patientStore`) or call server mutation hooks directly.
- They must depend solely on basic utility libraries or standard HTML/Tailwind specifications.

### 2. Feature-Slice Encapsulation (`src/features/`)
Each directory inside `src/features/` is a self-contained business slice:
- Feature views should be organized into:
  - `components/` - Sub-components local only to this feature slice.
  - `hooks/` - Local query, mutation, or validation hooks.
  - `pages/` - Parent route view pages.
  - `schemas/` - Zod form schemas.
  - `types.ts` - Feature-specific types.
- Feature components may import from shared `src/components/`, `src/store/`, `src/api/`, or `src/router/`.
- **STRICT BOUNDARY**: A feature slice must **NEVER** import directly from another feature slice's internal sub-folders. This prevents tight coupling and circular references. If two features share code, it must be extracted into `src/components/` or `src/api/`.

### 3. Path Alias Mappings (`@/*`)
To ensure high import readability and prevent directory depth pollution, always use the `@/` path alias pointing to the root workspace:

```typescript
// ❌ WRONG
import { useAuthStore } from '../../../store/authStore';

// ✅ CORRECT
import { useAuthStore } from '@/store/authStore';
```

---

## Do's and Don'ts

### DO
- ✅ Keep files highly modular. Extract complex layouts out of route page files into local feature components.
- ✅ Place reusable TS types in `src/api/types.ts` so they act as a single source of truth across all features.
- ✅ Group files strictly under their designated feature slices (e.g., place `LoginPage` under `e0-foundation`).

### DON'T
- ❌ Do not drop utility or helper files at random root levels.
- ❌ Do not mix state management inside layout components. Always decouple state using custom hook controllers.

## Dependencies on Other Skills
- Styled by: `03-clean-minimalism-ui.md`
- Implemented via: `02-react-engineering.md`
