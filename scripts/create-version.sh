#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 <version>"
  echo "Example: $0 1.2.0"
  exit 2
fi

VERSION="$1"

echo "Creating Docusaurus docs version: $VERSION"
# Ensure local changes are committed first
if ! git diff --quiet || ! git diff --staged --quiet; then
  echo "Uncommitted changes found. Please commit or stash them before versioning."
  exit 3
fi

# run the docusaurus CLI
npm run docusaurus docs:version "$VERSION"

# Commit generated files
git add versioned_docs versioned_sidebars versions.json
git commit -m "chore(docs): cut docs version $VERSION"

echo "Version $VERSION created and committed. Consider tagging the release:"
echo "  git tag -a docs-v$VERSION -m \"Docs version $VERSION\""
