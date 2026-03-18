# Netflix Household No More 🚫

A Safari browser extension for educational purposes that demonstrates how web extensions can interact with web pages. This project is intended for **educational and research purposes only**.

**Built for:** `Safari` (macOS)

---

## ⚠️ IMPORTANT LEGAL DISCLAIMER

**This software is provided "as is" for educational and research purposes only.**

- **Not Affiliated:** This project is not endorsed by, affiliated with, or sponsored by Netflix, Inc.
- **Use at Your Own Risk:** By using this software, you acknowledge and agree that you are solely responsible for any consequences that may result from its use.
- **Terms of Service:** Using this extension may violate Netflix's Terms of Service. You are solely responsible for reviewing and complying with applicable terms of service.
- **No Warranty:** This software is provided without any warranty, express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose.
- **No Liability:** The authors and contributors shall not be liable for any damages, claims, or legal actions arising from the use of this software.
- **Educational Use Only:** This project is intended to demonstrate Safari web extension capabilities for educational purposes.

**By using this software, you agree to these terms.**

---

## Features

This Safari extension demonstrates:
- **Content Script Injection:** How extensions can inject scripts into web pages
- **DOM Manipulation:** Using MutationObserver to detect and modify page elements
- **Network Request Interception:** Understanding how web requests can be monitored and modified
- **Safari Web Extension API:** Building extensions for Safari using Xcode

---

## Installation

### Apple Safari (macOS)

Safari extensions require Xcode to build and install:

1. **Install Xcode** from the Mac App Store

2. **Clone or download** this repository

3. **Build the extension:**
   ```bash
   chmod +x build_tools/build-for-safari.sh
   ./build_tools/build-for-safari.sh
   ```

4. **Open the Xcode project:**
   ```bash
   open build_tools/build/safari/Netflix\ Household\ Bypass/Netflix\ Household\ Bypass.xcodeproj
   ```

5. **Configure signing in Xcode:**
   - Click on the project in the left sidebar
   - Select the target "Netflix Household Bypass"
   - Go to **Signing & Capabilities** tab
   - Select your **Team** (Apple ID)

6. **Build and run:**
   - Press **Cmd+R** to build and install
   - If prompted, allow the app in **System Settings > Privacy & Security**

7. **Enable the extension:**
   - Open **Safari > Settings > Extensions**
   - Enable "Netflix Household Bypass"

---

## Technical Details

### How It Works

1. **On `/watch/` pages:** Intercepts specific GraphQL requests using fetch/XHR interception in the page context
2. **On other pages:** Uses MutationObserver to detect and remove modal elements
3. **CSS Injection:** Forcefully hides modal elements with CSS rules using `!important`

### Architecture

```
HouseholdNoMore/
├── background-safari.js    # Safari background script (event listeners)
├── content.js              # Content script (modal hiding + request blocking)
├── early-inject.js         # Early injection for reliable page context blocking
├── modal-hider.css         # CSS rules to hide modals
├── popup.html/css/js       # Extension popup (static info)
└── build_tools/
    ├── build-for-safari.sh # Build script
    └── manifest-safari.json # Safari manifest
```

### Blocked Operations

The extension intercepts GraphQL operations related to household verification:
- `CLCSInterstitialLolomo`
- `verifyHousehold`
- `householdVerification`
- And similar operations

---

## Known Issues

- **Video UI may not appear:** Refresh the page if the video player UI is missing
- **Console errors:** Expected behavior when intercepting requests (CORS errors)
- **Fragile selectors:** Netflix may update class names, breaking modal detection
- **Netflix updates:** Changes to Netflix's code may break functionality
- **Persistent background warning:** Safari warning about persistent background pages can be ignored for macOS desktop use

---

## For Educational Use

This Safari extension project is intended for:
- ✅ Learning Safari web extension development
- ✅ Understanding Xcode extension projects
- ✅ Research on web security and extension capabilities
- ✅ Personal educational experimentation

This project is **NOT** intended for:
- ❌ Circumventing paid services
- ❌ Violating terms of service
- ❌ Commercial use
- ❌ Redistribution without permission

---

## Uninstall

1. Open **Safari > Settings > Extensions**
2. Disable "Netflix Household Bypass"
3. Delete the extension app from **Applications** folder (if installed)

---

## License

**Educational Use Only**

This software is provided for educational and research purposes only. By using this software, you agree to:

1. Use it solely for learning and research purposes
2. Not redistribute or modify without explicit permission
3. Not use it for commercial purposes
4. Comply with all applicable laws and terms of service
5. Accept full responsibility for any consequences

**No warranty is provided. Use at your own risk.**

---

## Acknowledgments

This project is created for educational purposes to demonstrate Safari web extension capabilities. All trademarks and registered trademarks are the property of their respective owners.
