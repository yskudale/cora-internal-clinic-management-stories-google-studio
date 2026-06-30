# Implementation History: Story 1.2 - API Client & Domain Types

- **Canonical Business Requirements Source of Truth**: [/docs/stories/STORY-1.2.md](/docs/stories/STORY-1.2.md)

## Story Summary
Establish domain interfaces and type systems for the clinical workflows of the Cora system, configure a resilient, standardized HTTP API client using Ky with automatic session cookie handling and query retrying, and deliver polished minimalist feedback components for state-driven interactions.

---

## Task 1.2.1: API Client, Type Definitions, and Interactive Feedback Components

### Task Summary
Implemented domain interfaces inside `src/api/types.ts` matching backend models, created a custom configured `apiClient` instance using Ky and a React Query `queryClient` with strict status-based retry thresholds, stubbed the lazily loaded authentication store to resolve circular module loading, and engineered polished interactive feedback blocks (spinner, error fallback, toast alerts with Zustand).

### Technical Decisions
1. **Ky HTTP Client Configuration**: Chosen for its clean interceptor APIs (`hooks`) and native retry handles. It handles session cookies gracefully via `credentials: 'include'` and intercepts standard 401s for state clearance and redirection.
2. **TanStack React Query Integration**: Configured the global `queryClient` with retry constraints (0 retries on standard client-side 4xx errors, up to 3 retries on 5xx errors) to prevent thrashing backend servers.
3. **Zustand Toast Store & Framer Motion Animations**: Toast messages use a central Zustand state engine with an automatic 4-second cleanup hook, and animate dynamically using `motion/react` with accessible color indicators (green for success, red for error).
4. **Circular Dependency Avoidance**: Imported `authStore` lazily inside the client's `afterResponse` hook, decoupling client initialization from state management setup.

### Files Created
- `/src/api/types.ts` - Central domain type declarations.
- `/src/api/client.ts` - Ky client initialization, query client settings, and status retry logic.
- `/src/store/authStore.ts` - Session management state container stub.
- `/src/components/feedback/ErrorFallback.tsx` - Elegant card display for boundary error capture.
- `/src/components/feedback/LoadingSpinner.tsx` - Accessible, multi-sized SVG indicator.
- `/src/components/feedback/Toast.tsx` - Zustand-backed alert triggers and animation handlers.
- `/src/components/feedback/feedback.test.tsx` - Robust JSDOM test suite checking state boundaries.

### Files Modified
- `/package.json` - Added `ky`, `@tanstack/react-query`, and `zustand` dependencies.
- `/.env.example` - Appended `VITE_API_BASE_URL` setup variable.
- `/src/main.tsx` - Wired up React Query client provider wrapping.
- `/src/App.tsx` - Embedded global `ToastContainer` to enable notifications across views.

### Folder Structure Changes
Extended standard architectural zones:
- `src/api/`
- `src/store/`
- `src/components/feedback/`

### Dependencies
- Depend on `@tanstack/react-query` and `ky` for communication.
- Depend on `zustand` for in-memory status tracking.
- Depend on `motion/react` for animations.

### Assumptions & Risks
- **Assumptions**: The system relies on standard browser environments with window pathname access for redirect mechanics.
- **Risks**: Redirection loops could arise if `/auth/login` triggers 401. Handled by strictly matching url pathname structures to exclude `/auth/login`.

### Validation Performed
- Ran compilation checks (`compile_applet`): Passed successfully.
- Ran style/convention checks (`npm run lint` / `lint_applet`): Passed cleanly.
- Executed Vitest automated test suite (`npx vitest run`): 6 tests passed (100% success rate).

### Manual Test Steps
1. Start development server using `npm run dev`.
2. Inspect browser DevTools inside the iframe to verify `QueryClientProvider` is properly initialized.
3. Call `toast.success("Message")` from the console or test hooks to verify animated toast cards.
4. Verify accessibility headers (`role="status"`, `aria-label`) on spinners of sizes `sm`, `md`, `lg`.

### Acceptance Criteria Status
- [x] Compilation without errors
- [x] Strict TypeScript types implemented with zero explicit `any` usage
- [x] Ky client set up with `credentials: 'include'` and custom 401 redirect loop prevention
- [x] 4xx retries configured to 0 and 5xx retries configured to 3 on clients
- [x] Developed highly accessible minimalist `ErrorFallback`, `LoadingSpinner`, and `Toast` blocks
- [x] Added automated test coverage verifying 100% success rate
