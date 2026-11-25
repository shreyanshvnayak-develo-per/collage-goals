#!/usr/bin/env bash
# TENSOR — install Claude Code skills.
#   ./install.sh                         → ~/.claude/skills (all projects)
#   ./install.sh --project /path/to/repo → /path/to/repo/.claude/skills
#   ./install.sh pattern-coach core-viva → only the named skills
set -euo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)/skills"
DEST="$HOME/.claude/skills"
picked=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --project) DEST="${2:?--project needs a path}/.claude/skills"; shift 2 ;;
    -h|--help) sed -n '2,5p' "$0"; exit 0 ;;
    *) picked+=("$1"); shift ;;
  esac
done

if [[ ${#picked[@]} -eq 0 ]]; then
  for d in "$SRC"/*/; do picked+=("$(basename "$d")"); done
fi

mkdir -p "$DEST"
for s in "${picked[@]}"; do
  if [[ ! -f "$SRC/$s/SKILL.md" ]]; then
    echo "✗ unknown skill: $s" >&2; exit 1
  fi
  mkdir -p "$DEST/$s"
  cp "$SRC/$s/SKILL.md" "$DEST/$s/SKILL.md"
  echo "✓ /$s → $DEST/$s"
done
echo "Done. Open Claude Code and type /${picked[0]}"
