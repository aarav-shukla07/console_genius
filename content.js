// This is content.js (it runs in the "isolated world")
// Its only job is to inject the injector.js script into the page's "main world".

const s = document.createElement('script');
s.src = chrome.runtime.getURL('injector.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);