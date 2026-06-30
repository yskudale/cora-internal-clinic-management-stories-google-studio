# Project Skill: Git & Pull Request Workflow

## Purpose
Enforces clean, semantic version control tracking and transparent pull request summaries. This facilitates code reviews, simplifies release tracking, and supports automated changelog generators.

## Scope of Application
To be executed after any task or story is verified and is ready for submission to version control.

---

## 1. Branch Naming Convention
Branches must follow a strict, descriptive format indicating the Jira ticket or Story identifier:

```
feature/story-<StoryId>-<short-description>
bugfix/story-<StoryId>-<short-description>
chore/story-<StoryId>-<short-description>
```

### Examples
- `feature/story-1.1-scaffold-tooling`
- `feature/story-1.2-api-types`
- `bugfix/story-2.1-search-null-pointer`

---

## 2. Commit Message Convention (Conventional Commits)
All commits must align with the **Conventional Commits v1.0.0** specification.

### Structure
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: A new user-facing feature.
- `fix`: A bug fix.
- `chore`: Maintenance work (build config, package installs, eslint configurations).
- `docs`: Documentation-only updates.
- `test`: Adding or modifying tests.
- `refactor`: Code changes that neither fix bugs nor add features.

### Examples
- `chore(tooling): configure eslint flat config and strict tsconfig settings`
- `feat(auth): implement privilege guard and session store`
- `test(app): add render and JSDOM validation suite`

---

## 3. Pull Request Structure

Every Pull Request must be generated with a comprehensive, professional description:

### Pull Request Title
```
feat(story-1.1): project scaffolding and strict tooling setups
```

### Pull Request Description Template
```markdown
## Summary
A concise paragraph explaining the goal and high-level technical changes of this PR.

## Story ID / Ticket Reference
- Story ID: STORY-1.1
- Epic: FOUNDATION

## Acceptance Criteria Checklist
- [x] All compiled checks pass cleanly
- [x] Strict TypeScript configuration applied
- [x] ESLint configuration completed

## Technical Decisions & Changes
- Implemented Flat ESLint config to future-proof lint gates.
- Switched TSCompiler to strict mode to prevent implicit type coercions.

## Testing Performed
- Ran linter: `npm run lint` -> passed.
- Ran tests: `npm run test` -> passed.

## Changed Files Summary
- `/eslint.config.js` (created)
- `/package.json` (modified)
- `/tsconfig.json` (modified)
```

---

## Do's and Don'ts

### DO
- ✅ Use precise scopes in commit messages (e.g. `(tooling)`, `(api)`, `(auth)`).
- ✅ Reference the correct Story or Task ID in the PR title.
- ✅ Keep commit messages imperative, present-tense (e.g. "configure", not "configured").

### DON'T
- ❌ Do not bundle unrelated story files into a single commit or branch. Keep changes atomic.
- ❌ Do not write generic or lazy commit messages (e.g. "updates", "fixed stuff", "working version").

## Dependencies on Other Skills
- Flows from: `01-story-workflow.md`
- Monitored by: `06-quality-gates.md`
