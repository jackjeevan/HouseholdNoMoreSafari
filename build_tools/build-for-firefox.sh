#!/bin/bash
echo "Building extension for Firefox..."

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

# Create the build directory and the firefox subdirectory if they don't exist
mkdir -p build_tools/build/firefox
cp build_tools/manifest-firefox.json manifest.json
zip -r build_tools/build/firefox/netflix-bypass-firefox.zip . --exclude='*.DS_Store*' --exclude='build_tools/*' --exclude='manifest-chrome.json' --exclude='*.git*'
echo "Done. Created build/firefox/netflix-bypass-firefox.zip"
rm manifest.json
