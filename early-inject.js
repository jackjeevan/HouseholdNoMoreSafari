/**
 * Netflix Household Bypass - Early Injection
 * Injects blocking code into the MAIN page context for immediate execution
 * Always enabled
 */

(function() {
    if (window.nfBypassInjected) return;
    window.nfBypassInjected = true;

    console.log("[NF Bypass] Setting up early injection...");

    const injectCode = `
    (function() {
        if (window.__nfBypassActive) return;
        window.__nfBypassActive = true;

        console.log("[NF Bypass] Page context injection active - ALWAYS ENABLED");

        const BLOCKED_OPS = [
            'CLCSInterstitialLolomo',
            'verifyHousehold',
            'householdVerification',
            'checkHousehold',
            'accountTransfer',
            'locationVerification',
            'deviceVerification',
            'InterstitialLolomo'
        ];

        // Block fetch
        const origFetch = window.fetch;
        window.fetch = function(input, init) {
            const url = typeof input === 'string' ? input : (input && input.url) || '';
            if (url.includes('web.prod.cloud.netflix.com/graphql')) {
                let opName = '';
                if (init && init.body) {
                    try {
                        const body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
                        opName = body.operationName || '';
                    } catch(e) {}
                }
                
                if (BLOCKED_OPS.includes(opName) || /household|verify|verification|transfer|location|device|interstitial/i.test(opName)) {
                    console.log("[NF Bypass] BLOCKED fetch:", opName);
                    return Promise.resolve({
                        ok: true, status: 200, statusText: 'OK',
                        json: () => Promise.resolve({ data: {} }),
                        text: () => Promise.resolve('{}'),
                        headers: new Headers()
                    });
                }
            }
            return origFetch.apply(this, arguments);
        };

        // Block XHR
        const origSend = XMLHttpRequest.prototype.send;
        const origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url) {
            this._nf_url = url;
            return origOpen.apply(this, arguments);
        };
        XMLHttpRequest.prototype.send = function(body) {
            if (this._nf_url && this._nf_url.includes('web.prod.cloud.netflix.com/graphql')) {
                let opName = '';
                if (body) {
                    try {
                        const p = typeof body === 'string' ? JSON.parse(body) : body;
                        opName = p.operationName || '';
                    } catch(e) {}
                }
                
                if (BLOCKED_OPS.includes(opName) || /household|verify|verification|transfer|location|device|interstitial/i.test(opName)) {
                    console.log("[NF Bypass] BLOCKED XHR:", opName);
                    Object.defineProperties(this, {
                        responseText: { value: '{}', writable: false },
                        response: { value: '{}', writable: false },
                        status: { value: 200, writable: false }
                    });
                    setTimeout(() => { if (this.onload) this.onload(); }, 0);
                    return;
                }
            }
            return origSend.call(this, body);
        };

        console.log("[NF Bypass] Blocking active in page context");
    })();
    `;

    // Create a script element to inject into the page
    const script = document.createElement('script');
    script.textContent = injectCode;
    
    // Inject as early as possible
    if (document.head) {
        document.head.appendChild(script);
        document.head.removeChild(script);
        console.log("[NF Bypass] Injected into page head");
    } else {
        document.documentElement.appendChild(script);
        document.documentElement.removeChild(script);
        console.log("[NF Bypass] Injected into documentElement");
    }

    console.log("[NF Bypass] Early injection setup complete");
})();
