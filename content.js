/**
 * Netflix Household Bypass - Content Script
 * Always enabled - blocks household verification and hides modals
 */

(function() {
    if (window.hasRunNetflixBypassContentScript) return;
    window.hasRunNetflixBypassContentScript = true;

    const GRAPHQL_URL = 'web.prod.cloud.netflix.com/graphql';
    const path = window.location.pathname;
    const isWatchPage = path.startsWith('/watch/');
    
    console.log("[NF Bypass] === Started ===");
    console.log("[NF Bypass] Path:", path, "| Watch:", isWatchPage);
    console.log("[NF Bypass] Extension is always ENABLED");

    // ============================================
    // PART 1: Hide modal on ALL pages
    // ============================================
    
    console.log("[NF Bypass] Setting up modal hiding");

    const MODAL_SELECTORS = [
        '.nf-modal.interstitial-full-screen',
        '[data-uia="modal-interstitial"]',
        '[data-uia="account-transfer-interstitial"]',
        '[data-uia="household-verification-modal"]',
        '[data-uia*="household"]',
        '[data-uia*="verification"]',
        '.interstitial-container',
        '[class*="modal"][class*="interstitial"]'
    ];

    const BACKGROUND_SELECTORS = [
        '.nf-modal-background[data-uia="nf-modal-background"]',
        '[class*="modal-background"]',
        '[class*="backdrop"]'
    ];

    function removeElement(el) {
        if (!el) return;
        try {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
                console.log("[NF Bypass] Removed modal/background");
            }
        } catch (e) {}
    }

    function findAndRemove(root) {
        MODAL_SELECTORS.forEach(selector => {
            try {
                const els = root.querySelectorAll ? root.querySelectorAll(selector) : [];
                els.forEach(removeElement);
            } catch (e) {}
        });
        
        BACKGROUND_SELECTORS.forEach(selector => {
            try {
                const bg = document.querySelector(selector);
                if (bg) removeElement(bg);
            } catch (e) {}
        });
    }

    function setupObserver() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type !== 'childList') return;
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        findAndRemove(node);
                    }
                });
            });
        });

        observer.observe(document.documentElement, { childList: true, subtree: true });
        console.log("[NF Bypass] Observer active");
        
        // Initial cleanup
        findAndRemove(document.documentElement);
        setTimeout(() => findAndRemove(document.documentElement), 100);
        setTimeout(() => findAndRemove(document.documentElement), 300);
        setTimeout(() => findAndRemove(document.documentElement), 1000);
        
        // Periodic cleanup
        let count = 0;
        const interval = setInterval(() => {
            findAndRemove(document.documentElement);
            count++;
            if (count > 5) clearInterval(interval);
        }, 2000);
    }

    if (document.documentElement) {
        setupObserver();
    } else {
        const obs = new MutationObserver(() => {
            if (document.documentElement) {
                obs.disconnect();
                setupObserver();
            }
        });
        obs.observe(document, { childList: true, subtree: true });
    }

    // ============================================
    // PART 2: Block GraphQL household verification requests
    // ============================================
    
    console.log("[NF Bypass] Setting up request blocking");
    
    const BLOCKED_OPERATIONS = [
        'CLCSInterstitialLolomo',
        'verifyHousehold',
        'householdVerification', 
        'checkHousehold',
        'accountTransfer',
        'locationVerification',
        'deviceVerification',
        'InterstitialLolomo'
    ];
    
    // Intercept fetch
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
        const urlStr = typeof input === 'string' ? input : (input?.url || '');
        
        if (urlStr.includes(GRAPHQL_URL)) {
            let operationName = '';
            
            if (init?.body) {
                try {
                    const body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
                    operationName = body.operationName || '';
                } catch (e) {}
            }
            
            const shouldBlock = BLOCKED_OPERATIONS.includes(operationName) ||
                               /household|verify|verification|transfer|location|device|interstitial/i.test(operationName);
            
            if (shouldBlock) {
                console.log("[NF Bypass] >>> BLOCKED fetch:", operationName);
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({ data: {} }),
                    text: () => Promise.resolve('{}'),
                    headers: new Headers()
                });
            }
        }
        
        return originalFetch.call(this, input, init);
    };
    
    // Intercept XHR
    const originalSend = XMLHttpRequest.prototype.send;
    const originalOpen = XMLHttpRequest.prototype.open;
    
    XMLHttpRequest.prototype.open = function(method, url) {
        this._nf_url = url;
        return originalOpen.apply(this, arguments);
    };
    
    XMLHttpRequest.prototype.send = function(body) {
        if (this._nf_url && this._nf_url.includes(GRAPHQL_URL)) {
            let operationName = '';
            
            if (body) {
                try {
                    const parsed = typeof body === 'string' ? JSON.parse(body) : body;
                    operationName = parsed.operationName || '';
                } catch (e) {}
            }
            
            const shouldBlock = BLOCKED_OPERATIONS.includes(operationName) ||
                               /household|verify|verification|transfer|location|device|interstitial/i.test(operationName);
            
            if (shouldBlock) {
                console.log("[NF Bypass] >>> BLOCKED XHR:", operationName);
                Object.defineProperties(this, {
                    responseText: { value: '{}', writable: false },
                    response: { value: '{}', writable: false },
                    status: { value: 200, writable: false }
                });
                setTimeout(() => {
                    if (this.onload) this.onload();
                }, 0);
                return;
            }
        }
        return originalSend.call(this, body);
    };
    
    console.log("[NF Bypass] Blocking:", BLOCKED_OPERATIONS.join(', '));
    console.log("[NF Bypass] === Initialized ===");
})();
