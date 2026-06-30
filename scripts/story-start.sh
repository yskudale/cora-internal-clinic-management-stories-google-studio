#!/bin/bash

# Exit immediately if any command fails
set -e

# Ensure the working tree is clean before creating a new branch
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "❌ Working tree is not clean."
  echo "Please commit or stash your changes before starting a new story."
  exit 1
fi

# Check if a Jira ticket ID was provided
if [ -z "$1" ]; then
  echo "❌ Error: Please provide a Jira story ID."
  echo "Usage: ./scripts/story-start.sh CORA-123"
  exit 1
fi

STORY_ID=$1
BRANCH_NAME="feature/$STORY_ID"

echo "🚀 Starting work on $STORY_ID..."

echo "🔄 Switching to main branch..."
git checkout main

echo "⬇️ Pulling latest changes from origin main..."
git pull origin main

echo "🌿 Creating and switching to new branch: $BRANCH_NAME..."
if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  echo "ℹ️ Branch already exists. Switching to $BRANCH_NAME..."
  git checkout "$BRANCH_NAME"
else
  echo "🌿 Creating and switching to new branch: $BRANCH_NAME..."
  git checkout -b "$BRANCH_NAME"
fi

echo "✅ Ready to write code on $BRANCH_NAME!"