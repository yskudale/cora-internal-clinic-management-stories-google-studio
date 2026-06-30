#!/bin/bash

# Exit immediately if any command fails
set -e

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
git checkout -b "$BRANCH_NAME"

echo "✅ Ready to write code on $BRANCH_NAME!"