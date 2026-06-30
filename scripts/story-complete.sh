#!/bin/bash

# Exit immediately if any command fails (this enforces the Quality Gate)
set -e

echo "🔍 Starting story completion workflow..."

echo "🧹 1/3: Running Linter..."
npm run lint

echo "ʦ 2/3: Running Typecheck..."
# We run tsc without outputting files to catch strict TS errors
npm run typecheck

echo "🧪 3/3: Running Tests..."
# Runs vitest once. Pass with no tests ensures it doesn't fail if you haven't written tests yet.
npm run test

echo "✅ Quality gates passed!"

echo "📦 Staging all changes..."
git add .

echo "📄 Generating diff for AI Studio..."
mkdir -p ai
git diff --staged > ai/diff.txt

echo "🎉 Done! Your changes are staged and ready."
echo "➡️  Next Step: Review the generated diff in 'ai/diff.txt' or share it with your AI assistant if needed."