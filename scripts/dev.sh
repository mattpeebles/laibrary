#!/usr/bin/env bash
set -e

echo "[dev.sh] Starting Phoenix server..."
mix phx.server &
MIX_PID=$!

cd assets
echo "[dev.sh] Starting NPM watcher..."
npm run dev:all &
NPM_PID=$!

echo "[dev.sh] Waiting on Phoenix ($MIX_PID) and NPM ($NPM_PID)..."

# Loop to wait for one to exit
while kill -0 $MIX_PID 2>/dev/null && kill -0 $NPM_PID 2>/dev/null; do
  sleep 1
done

echo "[dev.sh] One of the processes exited. Cleaning up..."

# Kill both to be sure
kill $MIX_PID $NPM_PID 2>/dev/null || true

# Exit tmux session
tmux kill-session -t laibrary || true
