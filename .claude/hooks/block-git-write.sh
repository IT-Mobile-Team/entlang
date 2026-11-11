#!/bin/sh
# PreToolUse hook: AI agents must never run `git commit` or `git push`.
# Developers commit and push themselves. Exit code 2 blocks the tool call.
node -e '
let input = "";
process.stdin.on("data", (d) => (input += d)).on("end", () => {
  let cmd = "";
  try { cmd = JSON.parse(input).tool_input?.command ?? ""; } catch { process.exit(0); }
  // git, optional global options (-C <path>, -c <k=v>, --flag), then commit/push
  const re = /\bgit((\s+-[Cc]\s+\S+)|(\s+--?[\w-]+(=\S+)?))*\s+(commit|push)\b/;
  if (re.test(cmd)) {
    console.error("Blocked: AI agents must not run git commit or git push. Suggest the command and let the developer run it.");
    process.exit(2);
  }
});'
