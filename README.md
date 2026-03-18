# Netflix Household No More 🚫

A browser extension for educational purposes that demonstrates how web extensions can interact with web pages. This project is intended for **educational and research purposes only**.

**Supports:** `Chrome` (and Chromium-based browsers like Edge) | `Firefox` | `Safari`

---

## ⚠️ IMPORTANT LEGAL DISCLAIMER

**This software is provided "as is" for educational and research purposes only.**

- **Not Affiliated:** This project is not endorsed by, affiliated with, or sponsored by Netflix, Inc.
- **Use at Your Own Risk:** By using this software, you acknowledge and agree that you are solely responsible for any consequences that may result from its use.
- **Terms of Service:** Using this extension may violate Netflix's Terms of Service. You are solely responsible for reviewing and complying with applicable terms of service.
- **No Warranty:** This software is provided without any warranty, express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose.
- **No Liability:** The authors and contributors shall not be liable for any damages, claims, or legal actions arising from the use of this software.
- **Educational Use Only:** This project is intended to demonstrate web extension capabilities for educational purposes.

**By using this software, you agree to these terms.**

---

## Features

This extension demonstrates:
- **Content Script Injection:** How extensions can inject scripts into web pages
- **DOM Manipulation:** Using MutationObserver to detect and modify page elements
- **Network Request Interception:** Understanding how web requests can be monitored and modified
- **Cross-Browser Development:** Building extensions that work across Chrome, Firefox, and Safari

---

## Installation

### Google Chrome / Microsoft Edge / Chromium Browsers

1. Download or clone this repository
2. Navigate to `chrome://extensions` (or `edge://extensions`)
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the `build_tools/build/chrome/` folder

### Mozilla Firefox

1. Download or clone this repository
2. Navigate to `about:debugging`
3. Click **This Firefox** → **Load Temporary Add-on**
4. Select `build_tools/build/firefox/manifest.json`

**Note:** Firefox temporary add-ons are removed when you close the browser.

### Apple Safari

Safari extensions require Xcode:

1. Install Xcode from the Mac App Store
2. Run the build script:
   ```bash
   chmod +x build_tools/build-for-safari.sh
   ./build_tools/build-for-safari.sh
   ```
3. Open the generated Xcode project:
   ```bash
   open build_tools/build/safari/Netflix\ Household\ Bypass/Netflix\ Household\ Bypass.xcodeproj
   ```
4. Select your development team in **Signing & Capabilities**
5. Build and run (Cmd+R)
6. Enable in **Safari > Settings > Extensions**

---

## Technical Details

### How It Works

1. **On `/watch/` pages:** Intercepts specific GraphQL requests using fetch/XHR interception
2. **On other pages:** Uses MutationObserver to detect and remove modal elements
3. **CSS Injection:** Forcefully hides modal elements with CSS rules

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

---

## For Educational Use

This project is intended for:
- ✅ Learning web extension development
- ✅ Understanding browser extension APIs
- ✅ Research on web security and extension capabilities
- ✅ Personal educational experimentation

This project is **NOT** intended for:
- ❌ Circumventing paid services
- ❌ Violating terms of service
- ❌ Commercial use
- ❌ Redistribution without permission

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

This project is created for educational purposes to demonstrate web extension capabilities. All trademarks and registered trademarks are the property of their respective owners.
