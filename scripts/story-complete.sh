#!/bin/bash

# Exit immediately if any command fails (this enforces the Quality Gate)
set -e

echo "🔍 Starting story completion workflow..."

echo "🧹 1/3: Running Linter..."
npm run lint

echo "ʦ 2/3: Running Typecheck..."
# We run tsc without outputting files to catch strict TS errors
npx tsc --noEmit

echo "🧪 3/3: Running Tests..."
# Runs vitest once. Pass with no tests ensures it doesn't fail if you haven't written tests yet.
npx vitest run --passWithNoTests

echo "✅ Quality gates passed!"

echo "📦 Staging all changes..."
git add .

echo "📄 Generating diff for AI Studio..."
git diff --staged > ai-diff.txt

echo "🎉 Done! Your changes are staged and ready."
echo "➡️  Next Step: Copy the contents of 'ai-diff.txt' and paste it to your AI Mentor for documentation generation."