---
name: ent-finish
description: Finish the current ticket – run checks, write docs/history/ENT-<nr>.md, update dev docs, prepare commit message and PR text for the developer.
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
the root `README.md` if setup changed (env variables, services, prerequisites). Skip this if nothing changed.

## 4. Hand over commit and push

**Never run `git commit` or `git push`.** The developer always commits and pushes.
In Claude Code a hook blocks both; other agents must follow this rule themselves.

Show the developer the history file and a summary of the doc changes, then give them:

- The commit message: `<type>: #ENT-<nr>: <Subject>`, blank line, `Refs ENT-<nr>`.
- The commands to run themselves: `git add …`, `git commit`, `git push`.
- The PR title `<Type>: #ENT-<nr>: <Subject>` and a PR description: `Closes ENT-<nr>` at the top, then
  `.github/pull_request_template.md` filled in ("How was it tested?" = verification from the history file).

Only after the developer has pushed and asks for it, you may open or update the draft PR with
`gh pr create --draft` / `gh pr edit`. Never mark it ready or merge it.

## 5. Update Linear

After the developer's OK, add a comment to the ticket: 2–3 sentence summary, link to the PR (if open),
and the path `docs/history/ENT-<nr>.md`.
