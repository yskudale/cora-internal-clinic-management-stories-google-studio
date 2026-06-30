# Architecture Decision Record: API Client, Type Definitions, and Interactive Feedback Components

## Metadata
- **ID**: ADR-001
- **Status**: Accepted
- **Motivating Story**: [Story 1.2: API Client & Domain Types](/docs/stories/STORY-1.2.md)
- **Date**: 2026-06-30

---

## Context
The Cora Clinical System requires robust and reliable communication with backend services. It is critical to:
- Pass session cookie credentials securely for all requests.
- Avoid exposing any API keys to the client.
- Distinguish between client-side errors (no retries) and server-side errors (retry up to 3 times) to prevent needless server load.
- Seamlessly handle session expiration (`401 Unauthorized`) without triggering endless redirection loops.
- Provide responsive, animated, and accessible interactive feedback components (loading spinners, error cards, and toast notifications) to prevent UI freezing.

---

## Decision
We selected the following libraries and architectural patterns:
1. **HTTP client library - Ky**: Ky was selected over native `fetch` or `axios` due to its extremely clean hook-based interceptors (`afterResponse`) and declarative retry options.
2. **State management - Zustand**: Zustand was chosen for global Toast notifications and the Auth/Session state. It is highly lightweight (under 1KB gzipped) and avoids standard React Context re-render noise.
3. **Circular dependency prevention**: Avoid loading `authStore` at the module definition level in `src/api/client.ts`. Instead, lazily load `/src/store/authStore` inside the interceptor function itself.
4. **Data fetching - TanStack React Query**: Configured a global `queryClient` with conditional retry checks based on error response status.
5. **Layout animations - motion/react**: Restructured and integrated `motion/react` to deliver smooth exit and entrance animation sequences for alert banners without blocking UI threads.

---

## Consequences

### Advantages
- **Type-safety**: Complete domain models are structured in a single TS declarations index.
- **Traceability**: All client operations are intercepted. No 401 response can bypass standard login prompts.
- **Performance**: Retries are highly targeted. 4xx errors fail-fast, while 5xx transient failures recover gracefully.
- **Accessibility**: Loading indicators and screen readers remain synchronized.

### Disadvantages/Risks
- Lazy imports add tiny asynchronous delays before auth clearance executes, though this is negligible in practice and keeps module loading clean.
