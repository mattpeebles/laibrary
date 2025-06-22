#!/usr/bin/env bash

cleanup() {
  echo "[dev.sh] Cleaning up..."
  kill $MIX_PID $NPM_PID 2>/dev/null || true
  tmux kill-session -t laibrary 2>/dev/null || true
  exit 0
}

trap cleanup SIGINT SIGTERM

echo "[dev.sh] Starting Phoenix server..."
mix phx.server &
MIX_PID=$!

cd assets || exit 1
echo "[dev.sh] Starting NPM watcher..."
npm run dev:all &
NPM_PID=$!

echo "[dev.sh] Waiting on Phoenix ($MIX_PID) and NPM ($NPM_PID)..."

# Loop until either process exits
while kill -0 $MIX_PID 2>/dev/null && kill -0 $NPM_PID 2>/dev/null; do
  sleep 1
done

cleanup
