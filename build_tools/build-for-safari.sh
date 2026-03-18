#!/bin/bash
echo "Building extension for Safari..."

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$SCRIPT_DIR/build"
SAFARI_DIR="$BUILD_DIR/safari"

# Create directories
mkdir -p "$SAFARI_DIR"

# Create a staging directory for the extension files (persists for Xcode references)
STAGING_DIR="$SAFARI_DIR/ExtensionFiles"
rm -rf "$STAGING_DIR"
mkdir -p "$STAGING_DIR"

# Copy all extension files to staging (use absolute paths)
echo "Copying files to staging..."
cp -r "$PROJECT_DIR/icons" "$STAGING_DIR/"
cp "$PROJECT_DIR/popup.html" "$STAGING_DIR/"
cp "$PROJECT_DIR/popup.js" "$STAGING_DIR/"
cp "$PROJECT_DIR/popup.css" "$STAGING_DIR/"
cp "$PROJECT_DIR/content.js" "$STAGING_DIR/"
cp "$PROJECT_DIR/early-inject.js" "$STAGING_DIR/"
cp "$PROJECT_DIR/background-safari.js" "$STAGING_DIR/background.js"
cp "$PROJECT_DIR/build_tools/manifest-safari.json" "$STAGING_DIR/manifest.json"
cp "$PROJECT_DIR/modal-hider.css" "$STAGING_DIR/"

echo "Files copied to staging:"
ls -la "$STAGING_DIR"

# Run the Safari converter
echo ""
echo "Converting to Safari extension..."
xcrun safari-web-extension-converter "$STAGING_DIR" --project-location "$BUILD_DIR" --force 2>&1

echo ""
echo "=== Code Signing Configuration ==="

# Configure code signing for ad-hoc signing
XCODE_PROJECT="$BUILD_DIR/Netflix Household Bypass/Netflix Household Bypass.xcodeproj"

if [ -f "$XCODE_PROJECT/project.pbxproj" ]; then
    sed -i '' 's/CODE_SIGN_IDENTITY = "Apple Development"/CODE_SIGN_IDENTITY = "-"/g' "$XCODE_PROJECT/project.pbxproj" 2>/dev/null
    sed -i '' 's/CODE_SIGN_STYLE = Automatic/CODE_SIGN_STYLE = Manual/g' "$XCODE_PROJECT/project.pbxproj" 2>/dev/null
    sed -i '' 's/DEVELOPMENT_TEAM = [A-Z0-9]*/DEVELOPMENT_TEAM = ""/g' "$XCODE_PROJECT/project.pbxproj" 2>/dev/null
    
    echo "✓ Code signing configured for development (ad-hoc signing)"
fi

echo ""
echo "=== Next Steps ==="
echo "1. Open the Xcode project:"
echo "   open \"$XCODE_PROJECT\""
echo ""
echo "2. In Xcode, clean build folder: Product > Clean Build Folder (Shift+Cmd+K)"
echo ""
echo "3. Build and run (Cmd+R)"
echo ""
echo "4. If prompted, allow the app in System Settings"
echo ""
echo "5. Enable in Safari > Settings > Extensions"
echo ""
echo "Done. Safari extension project created."
