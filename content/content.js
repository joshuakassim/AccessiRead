// Inject content.css into the current webpage
const link = document.createElement('link');
link.href = chrome.runtime.getURL('content/content.css');
link.type = 'text/css';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Get domain
const domain = window.location.hostname;

// Load settings
chrome.storage.sync.get(
  ['dyslexicFont', 'lineSpacing', 'darkMode'],
  function (result) {
    const settings = result;
    applySettings(settings);
  }
);

function applySettings(settings) {
  if (!settings) return;

  const body = document.body;

  // Apply font
  if (settings.dyslexicFont) {
    body.classList.add('accessiread-active');
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

  // Message listener for settings updates
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === 'updateSettings') {
      applySettings(request.settings);
      const settings = { ...request.settings };
      chrome.storage.sync.set([
        { dyslexicFont: settings.dyslexicFont },
        { lineSpacing: settings.lineSpacing },
        { darkMode: settings.darkMode },
      ]);
    }
  });
}
