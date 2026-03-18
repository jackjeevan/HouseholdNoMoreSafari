              
<a href="https://www.buymeacoffee.com/amach1" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>



# Netflix Household No More 🚫

A browser extension aiming to bypass the Netflix household verification prompts by employing different strategies depending on the page context.

**Supports:** `Chrome` (and Chromium-based browsers like Edge) | `Firefox` | `Safari`

---

## Features

*   **Blocks Verification Request on `/watch`:** Prevents the specific GraphQL network request associated with the household check from running when you are on a video watching page (`/watch/`).
*   **Hides Verification Modal on `/browse` (and others):** On pages *other* than `/watch/` (like the main browse page), it hides the household verification modal popup if it appears.
*   **Target:** Only affects `netflix.com` domains.


---

## Installation (Official)

**Mozilla Firefox:** https://addons.mozilla.org/cs/firefox/addon/netflix-household-no-more/

**Google Chrome / Microsoft Edge / Chromium Browsers:** Extension wont be published there. (approval for upload was denied)

**Safari:** Not published on App Store. Use local installation below.


## Installation (Local Development/Testing)

As this extension is not published yet on chrome store, you need to load it manually.

**Google Chrome / Microsoft Edge / Chromium Browsers:**

1.  Download or clone this repository to your local machine.
2.  Open your browser and navigate to `chrome://extensions` (or `edge://extensions`).
3.  Enable **Developer mode** (usually a toggle in the top-right corner).
4.  Click the **Load unpacked** button.
5.  Select the directory where you saved the extension files. In folder `build_tools/build/chrome/` (the folder containing `manifest.json`).
6.  The extension should now be loaded and active.

**Mozilla Firefox:**

1.  Download or clone this repository to your local machine.
2.  Open Firefox and navigate to `about:debugging`.
3.  Click on **This Firefox** in the left sidebar.
4.  Click the **Load Temporary Add-on...** button.
5.  Navigate to the directory where you saved the extension files. In folder `build_tools/build/firefox/` you need to extract the zip folder.
6.  Select the **`manifest.json`** file itself inside the extracted folder.
7.  The extension should now be loaded and active for the current browser session.
    *   **Note:** Firefox temporary add-ons are removed when you close the browser. You will need to reload it each time you restart Firefox.

**Apple Safari:**

Safari extensions require Xcode. The build script will create a Safari app for you:

1.  Download or clone this repository to your local machine.
2.  Install Xcode from the Mac App Store (required for Safari extension development).
3.  Run the Safari build script:
    ```bash
    chmod +x build_tools/build-for-safari.sh
    ./build_tools/build-for-safari.sh
    ```
4.  This will create a `Netflix Household Bypass` folder in `build_tools/build/safari/`.
5.  Open the generated Xcode project: `build_tools/build/safari/Netflix Household Bypass.xcodeproj`
6.  In Xcode, select your development team (required for signing):
    - Click on the project in the left sidebar
    - Select the target "Netflix Household Bypass"
    - Under "Signing & Capabilities", select your Team
7.  Build and run the project (Cmd+R) - this will install the extension app.
8.  Open **Safari > Settings > Extensions** and enable "Netflix Household Bypass".
9.  The extension should now be active.

**Note:** The warning about "Persistent background pages" on iOS/iPadOS can be ignored for macOS desktop use.

---

## Caveats & Known Issues

*   **Netflix Video player UI is not visible:** If u dont see the video player UI, just refresh the page. that should fix it for you.

*   **Netflix Updates:** Netflix frequently updates its website and internal APIs. Any changes to the GraphQL endpoint URL, the request structure, the page structure (`/watch/` path), or the modal's CSS selectors/HTML structure could break this extension partially or completely.
*   **Console Errors:** When on a `/watch/` page, you **will** see network errors (often CORS-related) in the browser's developer console. This is an expected side effect of the extension successfully blocking the network request. While visually noisy, it generally does not impact performance.
*   **Fragile css:** The modal hiding relies on specific CSS class names and `data-uia` attributes. These might change without notice.

---

## Disclaimer

*   This extension is not endorsed by or affiliated with Netflix in any way.
*   Use this extension at your own risk. The developers assume no liability.
*   Modifying network requests or the DOM on third-party websites might violate their Terms of Service. Be aware of the potential consequences.

---

## License

Copyright [Amachi] - All Rights Reserved.

Permission is granted to download and use this software for personal, non-commercial purposes only. Redistribution, modification, or commercial use of this software, in whole or in part, is strictly prohibited without the express written permission of the copyright holder.
