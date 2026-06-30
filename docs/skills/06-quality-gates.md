# Project Skill: Quality Gates & Automated Testing

## Purpose
To establish strict, non-negotiable verification steps for every completed change. This ensures zero regression, high code test coverage, and strict compilation hygiene before human review is requested.

## Scope of Application
To be executed at the end of **every** task and before **every** story completion transition.

---

## The 4-Tier Automated Quality Gate

```
[ Step 1: Linting ] ──► [ Step 2: Type Checking ] ──► [ Step 3: Test Suite ] ──► [ Step 4: Production Build ]
```

### 1. Static Analysis (Linting)
- **Objective**: Ensure absolute stylistic consistency and find potential syntax anomalies or code smell patterns.
- **Command to Run**: `npm run lint` (or use `lint_applet` inside the dev space).
- **Quality Criteria**: Exit code `0` with exactly **zero warnings or errors**.

### 2. Strict Compilation (Type Checking)
- **Objective**: Guarantee that all files, typings, and imports align with our strict TypeScript compiler rules.
- **Command to Run**: `npm run typecheck` (which calls `tsc --noEmit`).
- **Quality Criteria**: Exit code `0` with exactly **zero errors**. No `any` type escapes should be allowed.

### 3. Automated Test Suite (Unit and Integration)
- **Objective**: Run all automated tests, and ensure code coverage is maintained or expanded.
- **Command to Run**: `npm run test` (which calls `vitest run`).
- **Quality Criteria**:
  - All tests must pass successfully (exit code `0`).
  - New implementation files must maintain a minimum of **85% code coverage** (lines, statements, branches, and functions).

### 4. Production Compilation (Build check)
- **Objective**: Confirm that the application packages and compiles successfully into production-ready assets.
- **Command to Run**: `npm run build` (or `compile_applet` inside the workspace).
- **Quality Criteria**: Exit code `0`, producing clean bundle outputs in `dist/` with no packaging failures.

---

## Code Defect Prevention Rules

- **Zero Legacy Escapes**: Never modify configuration files to ignore linting errors (e.g. adding `eslint-disable` rules) or bypass compiler failures (e.g. adding `// @ts-ignore` comments) unless explicitly authorized by the Tech Lead.
- **No Floating Code**: All modified or created modules must be explicitly imported or referenced by active routers, views, or entry-point files. Unused imports or dead functions must be removed immediately.

---

## Do's and Don'ts

### DO
- ✅ Run quality checks locally before requesting human reviews or submitting commit artifacts.
- ✅ Fix formatting, spacing, and unused imports instantly when flagged by the linter.
- ✅ Write comprehensive unit tests for any new utilities, validators, or helpers.

### DON'T
- ❌ Do not assume code is safe because "it works in the live preview". Always let the automated tools verify correctness.
- ❌ Do not proceed with any subsequent tasks if the current build or tests are failing. Fix immediately.

## Dependencies on Other Skills
- Enforces code written in: `02-react-engineering.md`, `07-architecture-structure.md`
- Verifies progress in: `01-story-workflow.md`
