# Entlang – Agent Instructions

Shared instructions for every AI agent (Claude Code, Codex, Cursor, Copilot, …) working in this repo.
Setup and how-tos live in Linear (project "Entlang", e.g. "Quick Setup").

## Repo layout

- `apps/api/` – NestJS API (ESM, Vitest, Swagger UI at `/api`)
- `apps/mobile/` – React Native app (planned, ENT-17)
- `infrastructure/` – Docker / Compose
- `postman/` – Postman collections
- `docs/` – cross-cutting dev docs and per-ticket history (see `docs/README.md`)

Planning and team process docs (Git workflow, quick setup) live in Linear, team "Entlang".

## Workflow per ticket

Every change belongs to a Linear ticket `ENT-<nr>`.

1. `/ent-start ENT-<nr>` – read the ticket and related history, create the branch, post a plan to Linear.
2. Implement together with the developer.
3. `/ent-finish` – verify, write `docs/history/ENT-<nr>.md`, update dev docs, prepare commit message and PR text.
4. The developer commits and pushes.

Without the skills (other agents): follow the steps in `.claude/skills/ent-start/SKILL.md` and
`.claude/skills/ent-finish/SKILL.md` manually.

**Before starting a ticket**, read the history files of related tickets in `docs/history/`
(linked issues, or `grep -ril <topic> docs/history/`). They record why things are the way they are.

## Checks

Before finishing, run the CI checks (`.github/workflows/ci.yml`) for every app that changed.
API, from `apps/api/`: `npm run lint && npm run format:check && npm run build && npm test`

## AI attribution (git-ai)

Every developer has [git-ai](https://usegitai.com) installed. It records automatically which lines
come from which agent (Git notes, synced on push/fetch, kept through squash merges by
`.github/workflows/git-ai.yaml`). Nothing to do manually. Useful: `git ai blame <file>`, `git ai stats`.

## Git conventions

Enforced by `commitlint.config.mjs`, `.githooks/` and `.github/workflows/conventions.yml`.

- Branch: `feature/ent-<nr>-<short-title>` from `develop`, published early; draft PR after the first commit
- Commit header: `<type>: #ENT-<nr>: <Subject>` (lowercase type, no trailing period, max 100 chars)
  Types: build, docs, chore, feature, fix, performance, refactor, revert, security, style, test, update
- Commit body: `Refs ENT-<nr>` (the `commit-msg` hook adds it if missing)
- PR title: like the header with capitalized type, e.g. `Feature: #ENT-20: Add login`
- PR description: `Closes ENT-<nr>` at the top, follow `.github/pull_request_template.md`
- Breaking changes: `[breaking-change]` after the ticket, e.g. `feature: #ENT-20: [breaking-change] …`
- **AI agents never run `git commit` or `git push`.** Suggest the message and commands; the developer runs them.
  Blocked in Claude Code by `.claude/settings.json` (deny rules + `.claude/hooks/block-git-write.sh`).
- Open a PR (`gh pr create --draft`) only after the developer pushed and asked for it. Never merge.

## Where documentation goes

| What | Where |
| --- | --- |
| Why this code is the way it is (non-obvious) | Short comment next to the code |
| What a public/central function does | TSDoc (`/** … */`) on exported services and helpers only |
| API endpoints | Swagger decorators, not hand-written docs |
| Setup and how-tos | Linear |
| How the apps fit together | `docs/architecture.md` |
| What was decided in a ticket and why | `docs/history/ENT-<nr>.md` (written once, not edited after merge) |
| What comes next | Linear |

Rules:

- Keep docs as close to the code as possible. No separate doc file per source file.
- Don't copy facts that change (versions, ports, scripts) into docs; point to the source file instead.
- When a change makes existing docs wrong, fix them in the same PR.
- When a convention changes, update this file in the same PR.
