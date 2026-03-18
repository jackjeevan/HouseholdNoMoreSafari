#!/bin/bash
echo "Building extension for Chrome..."

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

# Create the build directory and the chrome subdirectory if they don't exist
mkdir -p build_tools/build/chrome
cp build_tools/manifest-chrome.json manifest.json
zip -r build_tools/build/chrome/netflix-bypass-chrome.zip . --exclude='*.DS_Store*' --exclude='build_tools/*' --exclude='manifest-firefox.json' --exclude='*.git*'
echo "Done. Created build/chrome/netflix-bypass-chrome.zip"
rm manifest.json
