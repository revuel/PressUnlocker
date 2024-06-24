async function fetchConfig() {
    const response = await fetch(chrome.runtime.getURL('config.json'));
    if (!response.ok) {
      throw new Error(`Failed to load config.json: ${response.statusText}`);
    }
    const text = await response.text();
    return JSON.parse(text);
  }

  function unlock() {
    console.log("Unlock function triggered");
  
    setTimeout(() => {
      const nodesToRemove = document.getElementsByClassName("fc-ab-root");
      if (nodesToRemove.length === 0) {
        console.log("No elements with class 'fc-ab-root' found");
      } else {
        for (let item of nodesToRemove) {
          console.log(`Removing item: ${item}`);
          item.remove();
        }
      }
  
      const body = document.getElementsByTagName("body")[0];
      if (!body) {
        console.log("Body element not found");
        return;
      }
  
      const currentStyle = body.getAttribute('style');
      if (currentStyle) {
        const newStyle = currentStyle.replace('overflow: hidden;', '');
        body.setAttribute('style', newStyle);
        console.log(`Updated body style: ${newStyle}`);
      } else {
        console.log("Body element has no style attribute or 'overflow: hidden;' not found");
      }
    }, 3000); // 4000 milliseconds = 4 seconds
  }
  
  
  async function handleNavigation(details) {
    // Only process the main frame
    if (details.frameId !== 0) return;
  
    const config = await fetchConfig();
    const domains = config.domains;
    const url = new URL(details.url);
  
    console.log('Config loaded:', JSON.stringify(config));
    console.log('Parsed URL:', url);
  
    domains.forEach(domain => {
      if (url.hostname.includes(domain)) {
        console.log(`Detected domain: ${domain} in URL: ${url.hostname}`);
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: unlock
        }).then(() => {
          console.log(`Injected content script into tab ${details.tabId}`);
        }).catch(err => {
          console.error(`Failed to inject content script: ${err.message}`);
        });
      }
    });
  }

  
chrome.webNavigation.onCompleted.addListener(handleNavigation);
chrome.webNavigation.onCreatedNavigationTarget.addListener(handleNavigation);
function waitForScriptsToExecute() {
    window.onload = function() {
      console.log('All scripts executed and page fully loaded');
      // Your custom logic here
    };
  }
  