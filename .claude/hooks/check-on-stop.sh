#!/usr/bin/env bash
#
# Enforces "npm run check passes before a task is done".
#
#   edited  PostToolUse (Edit/Write/...): marks that this session changed a file
#           in this checkout (not memory or scratch files elsewhere).
#   stop    Stop: if this session changed files, runs `npm run check` (type
#           check + lint). On failure, exits 2 with the output's tail, which
#           sends Claude back to fix it.
#
# A turn that changed nothing (a question, a review) costs nothing. The block
# happens at most once per stop: with stop_hook_active set, Claude has already
# seen the failure and may stop, e.g. to ask the user something.
#
# Known limitation: edits made via Bash (sed, heredoc) don't mark the session.
#
# A simpler version of family-planner's check-on-stop.sh (no tree fingerprints:
# the check here takes seconds, so running it again is cheap).

set -u

mode="${1:-stop}"
input=$(cat)

fields=$(printf '%s' "$input" | node -e '
let raw = "";
process.stdin.on("data", (d) => (raw += d));
process.stdin.on("end", () => {
  try {
    const j = JSON.parse(raw);
    const i = j.tool_input || {};
    process.stdout.write([j.session_id || "default", j.stop_hook_active ? "1" : "0", i.file_path || i.notebook_path || ""].join("\n"));
  } catch (e) {
    process.stdout.write("default\n0\n");
  }
});
' 2>/dev/null) || exit 0

session_id=$(printf '%s' "$fields" | sed -n 1p)
stop_active=$(printf '%s' "$fields" | sed -n 2p)
file=$(printf '%s' "$fields" | sed -n 3p)

root="${CLAUDE_PROJECT_DIR:-.}"
cd "$root" || exit 0

tmpdir="${TMPDIR:-${TEMP:-/tmp}}"
edited="$tmpdir/claude-check-$session_id.edited"

case "$mode" in
cleanup)
  find "$tmpdir" -maxdepth 1 -name 'claude-check-*' -mtime +7 -delete 2>/dev/null
  exit 0
  ;;
edited)
  # node's path.relative compares Windows paths case-insensitively.
  [ -n "$file" ] && node -e '
const path = require("path");
const rel = path.relative(process.argv[1], path.resolve(process.argv[2]));
process.exit(rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel) ? 0 : 1);
' "$(pwd)" "$file" 2>/dev/null && : >"$edited"
  exit 0
  ;;
esac

[ -f "$edited" ] || exit 0
[ "$stop_active" = "1" ] && exit 0

log=$(mktemp)
if npm run check >"$log" 2>&1; then
  rm -f "$edited" "$log"
  exit 0
fi

{
  echo "npm run check fails. Fix it before you finish, or say why it can't pass yet. Last lines:"
  tail -n 60 "$log"
} >&2
rm -f "$log"
exit 2
