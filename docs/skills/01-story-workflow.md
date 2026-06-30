# Project Skill: Story Workflow Lifecycle

## Purpose
To define a strict, non-negotiable Agile development lifecycle for all engineering tasks. It prevents scope creep, keeps implementation atomic, and enforces explicit human-in-the-loop validation checkpoints.

## Scope of Application
Must be referenced at the start of every user story/Jira ticket, and during any step transitions.

---

## The 6-Phase Agile Lifecycle

```
[ Phase 1: Analyze ] ──► [ Phase 2: Task Breakdown ] ──► [ Phase 3: Implement (Atomic) ]
                                                                     │
[ Phase 6: Verify ]  ◄── [ Phase 5: Git & PR ]       ◄── [ Phase 4: Document ]
```

### Phase 1: Analyze (Human Checkpoint #1)
Before writing any code or proposing a task breakdown:
1. Explain the target story in simple, functional language.
2. List all acceptance criteria.
3. Identify dependencies on previous stories.
4. Identify any assumptions or ambiguities.
5. Highlight potential technical/business risks.
6. **Stop & request explicit user approval.**

### Phase 2: Task Breakdown (Human Checkpoint #2)
Decompose the approved user story into the smallest possible logical increments:
1. Each task must take no more than 15–30 minutes to implement.
2. Each task must modify only one logical area of the codebase.
3. Each task must modify/create at most 3–5 files.
4. Provide a sequential, numbered checklist of tasks.
5. **Stop & request explicit user approval before starting the first task.**

### Phase 3: Implement (One Task at a Time)
1. **Explain the task** (Task ID, Name, Purpose, technical approach, files to modify/create).
2. Generate code **ONLY** for that single task.
3. Never mix unrelated work or implement future tasks prematurely.
4. Keep models within the 300 LOC limit per response to prevent truncation.

### Phase 4: Document
Immediately following code implementation, update standard project logs:
1. `docs/worklog.md` (date-based activity ledger).
2. `docs/story-tracker.md` (active story/task matrix).
3. `docs/changelog.md` (cumulative semantic releases).
4. `docs/implementation/STORY-<id>.md` (comprehensive story context).

### Phase 5: Git & Jira Simulation
Generate standard Git and Jira compliance templates:
1. **Jira update** (work completed, files changed, testing performed, criteria checked).
2. **Git metadata** (branch names, conventional commits, PR title and descriptions).

### Phase 6: Verify
Provide a manual verification checklist:
1. Commands to run to verify compilation, linting, and tests.
2. Step-by-step instructions for testing the feature in the runtime sandbox.
3. **Stop & wait for human verification confirmation before proceeding.**

---

## Do's and Don'ts

### DO
- ✅ Treat the user's approval as a strict block. Stop and wait when requested.
- ✅ Describe the plan exactly before running any modifications.
- ✅ Re-verify files using `view_file` if edits fail with target matching errors.

### DON'T
- ❌ Never proceed to a new task or story without explicit confirmation.
- ❌ Never generate mock, simulated, or placeholder code.
- ❌ Never leave trailing TODOs or unfinished functions.

## Dependencies on Other Skills
- Enforced by: `06-quality-gates.md`
- Outputs to: `04-documentation-standards.md`, `05-git-pr-workflow.md`
