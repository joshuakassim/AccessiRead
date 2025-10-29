if (!window.accessiReadInjected) {
  // Flag to indicate script has been injected
  window.accessiReadInjected = true;

  // Inject content.css into the current webpage
  const link = document.createElement('link');
  link.href = chrome.runtime.getURL('content/content.css');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // Load settings and apply settings
  chrome.storage.sync.get(
    ['dyslexicFont', 'lineSpacing', 'darkMode'],
    function (result) {
      const settings = result;
      applySettings(settings);
    }
  );

  // Apply settings on message from background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Content script received message:', request);
    if (request.action === 'UPDATE_SETTINGS') {
      applySettings(request.settings);
      sendResponse({ status: 'Updated' });
    }
    return true;
  });
} else {
  log('Content script already injected.');
}

// Function to apply settings to the webpage
function applySettings(settings) {
  // Ensure settings exist
  if (!settings) return;

  const body = document.body;

  // Apply font
  if (settings.dyslexicFont) {
    body.classList.add('accessiread-active');
    // Watch for changes in DOM and apply font to changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (node of mutation.addedNodes) {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            !node.matches('i, code, pre, kbd, samp, var, .icon, [aria-hidden]')
          ) {
            node.classList.add('accessiread-active');
          }
        }
      }
    });
  } else {
    body.classList.remove('accessiread-active');
  }

  // Apply spacing
  // body.classList.remove(
  //   ...body.classList.filter((c) => c.startsWith('accessiread-spacing-'))
  // );
  // if (settings.lineSpacing) {
  //   // Test out divide by 50 to scale to class
  //   body.classList.add(`accessiread-spacing-${settings.lineSpacing}`);
  // }

  // Apply letter spacing (TO DO)

  // Apply font size (TO DO)

  // Apply color theme
  if (settings.darkMode) {
    body.classList.add('accessiread-dark');
  } else {
    body.classList.remove('accessiread-dark');
  }
}
