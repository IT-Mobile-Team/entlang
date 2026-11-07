# ENT-16: Research and decide repository docs and AI-agent specs workflow

Ticket: https://linear.app/it-mobile-team/issue/ENT-16 · PR: – (proposal, pending team review) · Date: 2026-11-07
Builds on: ENT-14 (Git workflow)

## Goal

A lightweight docs and AI-agent workflow, so that agents of different developers work the same way
and have context on what others built and why.

## Decisions

- **Root `AGENTS.md` as the single entry point, `CLAUDE.md` imports it via `@AGENTS.md`**: one file is read by
  Claude Code, Codex, Cursor and Copilot. A file inside `docs/` would not cover `apps/`. Nested
  `apps/<app>/AGENTS.md` for app-specific rules.
- **Per-ticket history files in `docs/history/`**: agents get decision context without Linear access, it is
  versioned with the code and reviewed in the PR. One file per ticket avoids merge conflicts.
  Rejected: a central changelog (conflicts), raw agent transcripts (noise, possibly sensitive data).
- **History ≠ dev docs**: history is a snapshot of why. Dev docs (`apps/<app>/README.md`, `docs/architecture.md`,
  TSDoc, Swagger) describe the current state and are updated in the same PR as the code.
- **Specs stay as Markdown in the Linear ticket**; the final spec ends up in the history file.
  Rejected for now: GitHub Spec Kit (too heavy), OpenSpec (extra tool; the history files cover the same need).
- **Shared skills in `.claude/skills/`**: `/ent-start` and `/ent-finish` make every agent follow the same steps.
  Rejected: plugin marketplace (only worth it with several repos).

## Final scope

`AGENTS.md`, `CLAUDE.md`, `apps/api/AGENTS.md`, skills `ent-start`/`ent-finish`, `docs/` structure with
history template, `.claude/settings.json`, `.gitignore` and PR template updates.

## Verification

- commitlint against the commit message
- New Claude Code session: AGENTS.md loaded, both skills listed

## Open points (team decision)

- AI attribution in commits (e.g. an `Assisted-by:` trailer) and whether to try git-ai (line-level, Git notes)
- Update the Linear document "Monorepo Structure" after the team agrees

## Contributors

- Jakob Laschober (research, decision), Claude Opus 5.5 (research, draft)
