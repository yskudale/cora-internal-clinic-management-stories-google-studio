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
