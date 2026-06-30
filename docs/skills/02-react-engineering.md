# Project Skill: React 19 & TypeScript Engineering Standards

## Purpose
Enforces high-quality, typed, robust frontend code practices in React 19 and strict TypeScript mode to ensure clean architecture and zero-defect execution.

## Scope of Application
To be applied when creating, editing, or refactoring any `.ts`, `.tsx`, or state stores.

---

## Technical Stack & Standards

### React 19 Compliance
- Use functional components exclusively (no class components).
- Leverage React 19 features (e.g. `use` for promise unwrapping, direct native form actions where requested).
- Adhere to React 19 rendering mechanics — never trigger state updates during render phases.
- Do not add complex arrays/objects in dependency arrays of `useEffect` to prevent infinite loops.

### Strict TypeScript Rules
- Always enable strict checks: `noImplicitAny`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`.
- Never use `any` or `unknown as any`.
- Enforce explicit return types for all public-facing methods, custom hooks, and API routes.
- Use standard `enum` types or `as const` object configurations for stable constants (e.g. privileges).
- Use `readonly` arrays/objects for stable application configurations.

### Tailwind CSS v4 Practice
- Style components strictly using utility classes. Do not create isolated custom CSS modules.
- Use semantic, consistent theme configurations for colors, typography, and layout.
- Maintain a clean responsive prefix flow (`sm:`, `md:`, `lg:`) to assure mobile and desktop parity.

### State Management (Zustand & TanStack Query)
- **Client State**: Manage transient global state using Zustand.
  - Persistent states (e.g. auth sessions) must use `sessionStorage` rather than `localStorage` to prevent stale data leaks across browser tabs.
  - Local, non-persisted states (e.g. active patient context) must remain in-memory and be cleared explicitly on logout.
- **Server State**: Manage remote resource queries and mutations via TanStack Query (React Query).
  - Use stable, serialized array keys for queries (e.g. `['patients', { phn }]`).
  - Set appropriate staleTimes/cacheTimes to prevent duplicate server queries during component mount cycles.

---

## Rules of Code Construction

### 1. Named Exports Only
Do not use `export default` anywhere. This enforces consistent import statements and simplifies IDE find-usages and refactoring.

```typescript
// ❌ WRONG
export default function PatientCard() { ... }

// ✅ CORRECT
export function PatientCard() { ... }
```

### 2. Form Architecture (React Hook Form + Zod)
Always use React Hook Form (`FormProvider` pattern) coupled with a schema validator (`zodResolver`) for input verification:
- Validate regex patterns at the schema level.
- Display error states inline directly beneath the affected field.
- Disable submit buttons during loading transitions to prevent double-submit actions.

### 3. Component Props & Named Interfaces
Always declare explicit prop interfaces for every component. Avoid inline anonymous structures:

```typescript
// ✅ CORRECT
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export function LoadingSpinner({ size = 'md', label = 'Loading' }: LoadingSpinnerProps) {
  ...
}
```

---

## Do's and Don'ts

### DO
- ✅ Keep components small, decoupled, and focused on a single responsibility.
- ✅ Handle asynchronous operations gracefully with try-catch blocks and explicit error state fallbacks.
- ✅ Group imports logically: React first, external libraries second, internal relative paths last.

### DON'T
- ❌ Do not use browser-blocking alerts like `window.alert()` or `confirm()`. Use custom inline dialogs instead.
- ❌ Do not import types as values. Use named imports or proper type-import mappings.
- ❌ Do not create unused hooks, states, or components.

## Dependencies on Other Skills
- Integrates with: `07-architecture-structure.md`, `06-quality-gates.md`
- Visualized by: `03-clean-minimalism-ui.md`
