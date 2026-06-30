# Project Skill: Documentation & Logging Standards

## Purpose
To establish a strict, repeatable framework for recording engineering progress, technical decisions, code modifications, and validation steps. This provides a transparent history for the engineering and management teams.

## Scope of Application
To be executed immediately following the completion of **every** individual task and user story.

---

## Required Documentation Artifacts

For every story or task completed, the following four documentation artifacts must be created or updated within the workspace.

### 1. Daily Work Log (`docs/worklog.md`)
Maintains a chronological, bulleted timeline of developer activity.
- **Location**: `docs/worklog.md`
- **Format**:
  ```markdown
  # Work Log

  ## [YYYY-MM-DD]
  ### Completed Tasks
  - **Task ID: Name**
    - High-level technical summary of changes made.
    - Specific files created, modified, or deleted.
  ```

### 2. Story Tracker (`docs/story-tracker.md`)
Acts as a spreadsheet-style overview of active story tickets and tasks.
- **Location**: `docs/story-tracker.md`
- **Format**:
  - A clean Markdown table with headers: `Story ID`, `Story Name`, `Task`, `Status`, `Files Created`, `Files Modified`, `Last Updated`.

### 3. Cumulative Changelog (`docs/changelog.md`)
Maintains a semantic history of major features added to the clinic system.
- **Location**: `docs/changelog.md`
- **Format**:
  ```markdown
  # Changelog

  ## [YYYY-MM-DD]
  ### Story <ID>: <Name>
  - **Task <ID>: <Name>**
    - Summary of feature releases and technical changes.
  ```

### 4. Implementation History (`docs/implementation/STORY-<id>.md`)
A deeply detailed, story-level technical dossier. This file is **appended** with new sections as tasks are completed — it must never be overwritten, preserving the iterative implementation narrative.
- **Location**: `docs/implementation/STORY-<id>.md`
- **Required Sections**:
  - **Story Summary**: Overall epic/feature scope.
  - **Task Summary**: Specific task details.
  - **Technical Decisions**: Architecture choices, patterns, or formulas used.
  - **Files Created / Files Modified**: Specific paths touched.
  - **Folder Structure Changes**: Any directory expansions.
  - **Dependencies**: Prerequisites or libraries introduced.
  - **Assumptions & Risks**: Known issues or mitigations.
  - **Validation Performed**: Automated check outcomes (lint, tests).
  - **Manual Test Steps**: Step-by-step reproduction instructions.
  - **Acceptance Criteria Status**: Checklist marking completed criteria (`[x]`).

---

## Do's and Don'ts

### DO
- ✅ Keep formatting clean, using semantic markdown headers and standard table alignments.
- ✅ List actual file paths relative to the project root (e.g. `/eslint.config.js`).
- ✅ Mark statuses objectively (e.g., ✅ Completed, 🟡 In Progress, ⬜ Pending).

### DON'T
- ❌ Do not fabricate or invent developer hours (e.g. "Estimated Time: 4.5 hours"). Leave as a placeholder or omit unless actual data is confirmed.
- ❌ Do not overwrite or lose historical task implementation notes when updating a story's implementation file. Always append new tasks sequentially.

## Dependencies on Other Skills
- Triggered by: `01-story-workflow.md`
- Audited against: `06-quality-gates.md`

---

# Story Source & Architectural Artifact Management

## Canonical Folder Structure

The project maintains a strict, standardized documentation tree under `/docs/`:

```text
docs/
├── stories/                    # Original, immutable Jira story/requirement documents (Canonical Source of Truth)
├── implementation/             # Engineering implementation detail reports (STORY-<id>.md)
├── decisions/                  # Architecture Decision Records (ADRs) for technical choices
└── reviews/                    # Peer review and code review reports for each completed story
```

## Story Archive Requirements

`docs/stories/` is the permanent, canonical source of truth for all business and technical requirements. Developers and agents **must not** rely on transient chat history as the source of truth once requirements are archived here.

Before any implementation begins:
1. Ensure the folder `docs/stories/` exists.
2. Create or verify a Markdown file for the current Story named `STORY-<id>.md` (e.g., `STORY-1.2.md`).
3. Copy and save the original story requirements exactly as received (including Jira stories, epics, descriptions, acceptance criteria, Jira comments, screenshots, or requirement updates) without summarizing, rewriting, or removing any section.
4. Keep original business flows, user stories, technical requirements, task breakdowns, and acceptance criteria.

### Story Updates
If additional acceptance criteria, design feedback, Jira comments, scope changes, or technical clarifications are introduced later, append them to the bottom of the existing story file under a `## Updates` section with date headings (e.g., `### YYYY-MM-DD`), rather than overwriting original requirements.

## Relationship & Linking Rules

To ensure complete traceability, the following cross-reference rules are enforced:
1. **Implementation Files**: Every implementation document under `docs/implementation/STORY-<id>.md` **MUST** explicitly link to or reference its corresponding requirement file under `docs/stories/STORY-<id>.md`.
2. **Peer Review Reports**: Every peer review under `docs/reviews/REVIEW-STORY-<id>.md` **MUST** explicitly link to or reference its corresponding requirement file under `docs/stories/STORY-<id>.md`.
3. **Architecture Decision Records**: Every ADR under `docs/decisions/ADR-<num>-<desc>.md` **SHOULD** explicitly link to or reference the motivating story file under `docs/stories/STORY-<id>.md` (e.g., in a "Motivating Story" section) when applicable.

## Architecture Decision Records (ADRs)

For non-trivial technical design choices (e.g., choice of libraries, API routing structures, state management rules, testing paradigms):
1. Create a markdown document under `docs/decisions/` named `ADR-<num>-<short-description>.md` (e.g., `ADR-001-api-client-architecture.md`).
2. Document:
   - **Status**: (Draft | Proposed | Accepted | Rejected | Superseded)
   - **Motivating Story**: (Link/reference to `docs/stories/STORY-<id>.md` if applicable)
   - **Context**: The background problem, technical constraints, and requirements.
   - **Decision**: The selected path, patterns, and libraries chosen.
   - **Consequences**: The trade-offs, benefits, risks, and next steps.
3. **ADR Index Maintenance**: Developers and agents **MUST** maintain `docs/decisions/index.md` automatically whenever a new ADR is created or updated.
   - The index file must contain a table with the columns: `| ADR | Story | Title | Status |`.
   - Never overwrite existing ADR records in the index table.
   - When a new ADR is added, append it to the index automatically.

## Peer & Code Review Tracking

Before a user story can be considered completely resolved:
1. Conduct a peer and code review (or automated structural assessment).
2. Save or update a report under `docs/reviews/` named `REVIEW-STORY-<id>.md` (e.g., `REVIEW-STORY-1.2.md`).
3. **Mandatory Sections & Structure**: Every review document MUST follow this template precisely and contain the following sections:

```markdown
# Review Summary

## Story
- **Story Requirements**: [Link to docs/stories/STORY-<id>.md]
- **Implementation Report**: [Link to docs/implementation/STORY-<id>.md]
- **Related ADRs**: [Link to related ADRs in docs/decisions/ if any, or "None"]

## Reviewer
- [Name/Role of Reviewer]

## Date
- [Date of Review]

## Files Reviewed
- [List of files changed or created]

## Positive Findings
- [What was done exceptionally well or conforms to best practices]

## Issues Found
- [Any bugs, warnings, linting issues, compilation blockers, or structural anomalies]

## Suggested Improvements
- [Non-blocking suggestions for code cleanup or future enhancements]

## Quality Gate Results
- **Lint**: [Status - e.g., ✅ Passed / ❌ Failed]
- **Typecheck**: [Status - e.g., ✅ Passed / ❌ Failed]
- **Tests**: [Status - e.g., ✅ Passed / ❌ Failed]
- **Build**: [Status - e.g., ✅ Passed / ❌ Failed]

## Decision
Choose exactly one of:
- ✅ Approved
- 🟡 Approved with Comments
- ❌ Changes Requested
```

## Story Completion Definition

A User Story is **NOT considered complete** until:
1. The original requirement sheet is preserved in `docs/stories/`.
2. The implementation file `docs/implementation/STORY-<id>.md` is fully updated and links to the story requirements.
3. Appropriate Architectural Decision Records are documented in `docs/decisions/` linking back to the motivating story.
4. The review report is filled out, links back to the story, and is marked as passed under `docs/reviews/`.
5. The global ledger files (`docs/worklog.md`, `docs/story-tracker.md`, `docs/changelog.md`) are updated.