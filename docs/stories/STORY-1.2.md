# Story 1.2: API Client & Domain Types

## Story Summary
Establish the foundational type systems and the resilient API communication layer for the Cora Clinical System. Configure a central, standard HTTP client with automated session management and custom query retry schemes to ensure robust server-client interactions under strict network conditions.

## Business Goal
To enable seamless and error-free communication between the React frontend and the Express backend using typed, strict domain contracts that prevent validation errors, and to implement user feedback boundaries that inform users of loading and error states without crashing.

## Technical Requirements
1. **Clinical Domain Models**: Define TypeScript interfaces with strict types (no `any`) for:
   - `Patient`: Core demographic and registration data (including PHN, names, DOB, gender).
   - `Item`: Clinical services, investigations, and medicines with stock quantities.
   - `PatientEncounter`: Records of patient visits, complaints, diagnosis, and triage statuses.
   - `PatientInvestigation` & `Prescription`: Details of diagnostic tests and medications.
   - `Bill` & `BillItem`: Financial transaction and invoice line-items.
   - `Staff`: System users and role-based access attributes (privileges).
2. **API Client & Request Lifecycle**:
   - Standardize client using the `ky` HTTP utility.
   - Enforce cookie credentials passing (`credentials: 'include'`).
   - Implement interceptors that clear local state and trigger window redirects to `/login` with return paths on HTTP `401 Unauthorized` responses.
   - Standardize retry behavior: zero retries for client errors (`4xx`), up to 3 retries for server errors (`5xx`).
3. **Interactive Feedback Components**:
   - `LoadingSpinner`: SVG spinner with size presets and ARIA-compliant status elements.
   - `ErrorFallback`: Clean card design targeting captured boundary errors with retry buttons.
   - `ToastContainer`: Zustand-driven notification tray that slides in toast messages with micro-animations.

## Acceptance Criteria
- [x] Strict TypeScript types implemented under `/src/api/types.ts`
- [x] Ky client set up with `credentials: 'include'` and custom 401 redirect loop prevention
- [x] 4xx retries configured to 0 and 5xx retries configured to 3 on clients
- [x] Highly accessible minimalist `ErrorFallback`, `LoadingSpinner`, and `Toast` components built
- [x] All feedback mechanisms tested with 100% success rate in unit tests
