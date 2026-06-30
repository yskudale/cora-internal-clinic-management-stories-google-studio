# Changelog

## [2026-06-30]

### Story 1.1: Project Scaffold
- **Task 1.1.1: Project Tooling & Configurations**
  - Integrated ESLint flat configuration (`eslint.config.js`).
  - Added strict TSCompiler type-safety flags in `tsconfig.json`.
  - Integrated Vitest with JSDOM environment and added setup test files.

### Story 1.2: API Client & Domain Types
- **Task 1.2.1: API Client, Type Definitions, and Interactive Feedback Components**
  - Implemented complete domain interfaces for patients, billing, encounters, and staff under `src/api/types.ts`.
  - Configured robust, resilient Ky HTTP client instance and a global React Query Client.
  - Developed user feedback primitives (`LoadingSpinner`, `ErrorFallback`, and `ToastContainer` with Zustand notifications).
  - Wrote a comprehensive JSDOM unit test suite for state-driven UI feedback.
