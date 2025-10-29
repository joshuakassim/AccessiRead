// Default settings
const defaultSettings = {
  dyslexicFont: false,
  lineSpacing: 1.5,
  darkMode: false,
  //TO DO (Other settings)
};

// Apply default settings when installed
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.sync.set(defaultSettings, () => {
      console.log('Installed');
      console.log('Default settings applied');
    });
  } else if (details.reason === 'update') {
    console.log('Updated');
  }
});

chrome.runtime.onStartup.addListener(() => {
  console.log('Started');
});

// Listen for message from popup and forward to content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (sender.tab) return;

  //Forward popups setting updates to content script
  if (request.action === 'UPDATE_SETTINGS') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        // Check if content script is injected
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            func: () => window.accessiReadInjected,
          },
          (results) => {
            if (results && results[0] && results[0].result) {
              console.log('Content script already injected.');
              return;
            }
            // Inject the content script if not already injected
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              files: ['content/content.js'],
            });
          }
        );
        // Send the settings to the content script
        chrome.tabs.sendMessage(tabs[0].id, request);
      }
    });
  }
});
