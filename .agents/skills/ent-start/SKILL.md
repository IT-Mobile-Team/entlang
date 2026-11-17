---
name: ent-start
description: Start work on a Linear ticket ENT-<nr> – read the ticket and related history, create the feature branch, post a short plan to Linear.
argument-hint: ENT-<nr>
disable-model-invocation: true
---

# Start a ticket

The ticket number `ENT-<nr>` comes from the invocation (in Claude Code: $ARGUMENTS).
Follow the conventions in `AGENTS.md`. Stop and ask if the ticket is unclear or the number is missing.

## 1. Load context

- Read the ticket with the Linear MCP (`get_issue` with relations, plus `list_comments`).
- Read related tickets (blocked by, related to, parent) briefly.
- Read `docs/history/ENT-<nr>.md` for every related ticket that has one. Also search
  `docs/history/` for the ticket's main topics (`grep -ril <topic> docs/history/`).
- Read the dev docs for the affected area (`docs/architecture.md`, root `README.md` for setup).

## 2. Create the branch

- Check `git status` is clean. If not, stop and ask.
- `git fetch origin develop` and branch off: `git switch -c feature/ent-<nr>-<short-title> origin/develop`
  (`<short-title>`: lowercase kebab-case, 2–5 words, from the ticket title).
- If the branch already exists, switch to it instead.
- Never push. Tell the developer to publish the branch early (Git Workflow): `git push -u origin <branch>`.

## 3. Post the plan

Write a short plan (5–10 bullets: approach, files/modules touched, how it will be verified, open questions).
Show it to the developer first. After their OK:

- Add or replace the plan in a collapsible section at the end of the ticket description
  (use `patch`, don't resend the whole description):

  ```
  +++ Agent notes

  **Plan** (<date>, <developer>)
  - …

  +++
  ```

- Set the ticket status to "In Progress" if it isn't already.

## 4. Report

Tell the developer in 3–5 lines: branch name, which history files were relevant and what they imply, open questions.
