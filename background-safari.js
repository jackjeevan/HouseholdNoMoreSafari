// Netflix Household Bypass - Background Script (Safari Version)
// Always enabled - no toggle

const WATCH_PATH = '/watch/';

console.log("Netflix Household Bypass background script loaded (Safari).");
console.log("[State] Extension is always ENABLED");

// --- Tab State Management ---

function handleTabState(tabId, url) {
    if (!url || !url.includes('netflix.com')) {
        return;
    }
    
    const isWatchPage = url.includes(WATCH_PATH);
    console.log(`[Tab] Tab ${tabId}: ${isWatchPage ? '/watch/' : 'browse'} page`);
}

// --- Event Listeners ---

chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId === 0 && details.url?.includes('netflix.com')) {
        handleTabState(details.tabId, details.url);
    }
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    if (details.frameId === 0 && details.url?.includes('netflix.com')) {
        handleTabState(details.tabId, details.url);
    }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    try {
        const tab = await chrome.tabs.get(activeInfo.tabId);
        if (tab?.url?.includes('netflix.com')) {
            handleTabState(activeInfo.tabId, tab.url);
        }
    } catch (error) {
        console.error(`[onActivated] Error:`, error.message);
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url?.includes('netflix.com')) {
        handleTabState(tabId, tab.url);
    }
});

console.log("[Background] Event listeners registered");
