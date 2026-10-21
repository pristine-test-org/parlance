#!/usr/bin/env bash
# Blocks hand edits to files a script writes.
path=$(jq -r '.tool_input.file_path // empty')
case "$path" in
  *.impeccable/design.json)
    echo "🚫 BLOCKED: This is the generated docs/DESIGN.md sidecar. Do not edit manually." >&2
    exit 2 ;;
esac
exit 0
