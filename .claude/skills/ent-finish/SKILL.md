---
name: ent-finish
description: Finish the current ticket – run checks, write docs/history/ENT-<nr>.md, update dev docs, commit and open the PR.
disable-model-invocation: true
---

# Finish the current ticket

Follow the conventions in `AGENTS.md`. Take the ticket number from the branch name
(`feature/ent-<nr>-…`). If it can't be determined, ask.

## 1. Verify

Run the checks for every app that changed (see "Checks" in `AGENTS.md`).
If something fails, fix it or stop and report. Don't continue with red checks.

## 2. Write the history file

Create `docs/history/ENT-<nr>.md` from `docs/history/_template.md`. If the file already exists
(the ticket spans several PRs), add a new dated section instead of rewriting it.

Content comes from this conversation, the ticket and the diff (`git diff origin/develop...HEAD`):

- **Decisions**: everything decided during the work, with the reason and rejected alternatives.
  This is the most important part. Include decisions that changed the original plan.
- **Final scope**: what was actually built, compared to the ticket.
- **Verification**: what was run and the result, plus manual checks.
- **Open points**: anything left for follow-up tickets.
- **Contributors**: add the AI share from `git ai stats origin/develop..HEAD` if git-ai is installed.

Keep it short (aim for under 60 lines). No code dumps, no file-by-file changelog. Git already has that.
Don't include secrets, tokens or personal data.

## 3. Update dev docs

Check whether the change makes existing docs wrong or incomplete and fix them in this PR
(see "Where documentation goes" in `AGENTS.md`): `docs/architecture.md`, `AGENTS.md` if a convention changed,
Linear setup docs if setup changed (ask before editing Linear). Skip this if nothing changed.

## 4. Commit and PR

Show the developer the history file and a summary of the doc changes. After their OK:

- Commit (one or more): `<type>: #ENT-<nr>: <Subject>` with `Refs ENT-<nr>` in the body.
- Push the branch. If a draft PR already exists (`gh pr view`), update its description; otherwise
  create one to `develop` with `gh pr create --draft`:
  - Title: `<Type>: #ENT-<nr>: <Subject>` (capitalized type)
  - Body: `Closes ENT-<nr>` at the top, then fill `.github/pull_request_template.md`.
    Under "How was it tested?" use the verification from the history file.
- Ask the developer whether to mark it ready for review (`gh pr ready`).

## 5. Update Linear

Add a comment to the ticket: 2–3 sentence summary, link to the PR, and the path `docs/history/ENT-<nr>.md`.
