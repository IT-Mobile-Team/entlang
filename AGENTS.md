# Entlang – Agent Instructions

Shared instructions for every AI agent (Claude Code, Codex, Cursor, Copilot, …) working in this repo.
App-specific rules live in `apps/<app>/AGENTS.md` and apply in addition to this file.

## Repo layout

- `apps/api/` – NestJS API (see `apps/api/AGENTS.md`)
- `apps/mobile/` – React Native app (planned, ENT-17)
- `infrastructure/` – Docker / Compose
- `postman/` – Postman collections
- `docs/` – cross-cutting dev docs and per-ticket history (see `docs/README.md`)

Planning and team process docs (Git workflow, quick setup) live in Linear, team "Entlang".

## Workflow per ticket

Every change belongs to a Linear ticket `ENT-<nr>`.

1. `/ent-start ENT-<nr>` – read the ticket and related history, create the branch, post a plan to Linear.
2. Implement together with the developer.
3. `/ent-finish` – verify, write `docs/history/ENT-<nr>.md`, update dev docs, commit, open the PR.

Without the skills (other agents): follow the steps in `.claude/skills/ent-start/SKILL.md` and
`.claude/skills/ent-finish/SKILL.md` manually.

**Before starting a ticket**, read the history files of related tickets in `docs/history/`
(linked issues, or `grep -ril <topic> docs/history/`). They record why things are the way they are.

## Git conventions

Enforced by `commitlint.config.mjs`, `.githooks/` and `.github/workflows/conventions.yml`.

- Branch: `feature/ent-<nr>-<short-title>` from `develop`, published early; draft PR after the first commit
- Commit header: `<type>: #ENT-<nr>: <Subject>` (lowercase type, no trailing period, max 100 chars)
  Types: build, docs, chore, feature, fix, performance, refactor, revert, security, style, test, update
- Commit body: `Refs ENT-<nr>` (the `commit-msg` hook adds it if missing)
- PR title: like the header with capitalized type, e.g. `Feature: #ENT-20: Add login`
- PR description: `Closes ENT-<nr>` at the top, follow `.github/pull_request_template.md`
- Breaking changes: `[breaking-change]` after the ticket, e.g. `feature: #ENT-20: [breaking-change] …`
- Never commit to `develop` or `main` directly. Never push or open a PR without the developer's OK.

## Where documentation goes

| What | Where |
| --- | --- |
| Why this code is the way it is (non-obvious) | Short comment next to the code |
| What a public/central function does | TSDoc (`/** … */`) on exported services and helpers only |
| API endpoints | Swagger decorators, not hand-written docs |
| Setup, commands, module overview of an app | `apps/<app>/README.md` |
| How the apps fit together | `docs/architecture.md` |
| What was decided in a ticket and why | `docs/history/ENT-<nr>.md` (written once, not edited after merge) |
| What comes next | Linear |

Rules:

- Keep docs as close to the code as possible. No separate doc file per source file.
- Don't copy facts that change (versions, ports, scripts) into docs; point to the source file instead.
- When a change makes existing docs wrong, fix them in the same PR.
- When a convention changes, update this file in the same PR.
