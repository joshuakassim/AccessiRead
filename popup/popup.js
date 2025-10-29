// Function to send updated settings to background script
function sendSettingUpdate() {
  chrome.storage.sync.get(
    ['dyslexicFont', 'lineSpacing', 'darkMode'],
    function (settings) {
      // Send the settings to the background service worker
      chrome.runtime.sendMessage(
        {
          action: 'UPDATE_SETTINGS',
          settings: settings,
        },
        // Callback to handle response
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(
              'Communication error with background script:',
              chrome.runtime.lastError.message
            );
          } else {
            // Handle response from the background script (which forwards content script's response)
            console.log('Settings update confirmed by background:', response);
          }
        }
      );
    }
  );
}

// Font interaction
const fontToggle = document.getElementById('font-toggle');
fontToggle.addEventListener('change', function () {
  chrome.storage.sync.set({ dyslexicFont: this.checked });
  sendSettingUpdate();
});

// Slider interation
const spacingSlider = document.getElementById('spacing-slider');
const spacingValue = document.getElementById('spacing-value');

spacingSlider.addEventListener('input', function () {
  spacingValue.textContent = `Spacing : ${this.value}`;
  chrome.storage.sync.set({ lineSpacing: this.value });
  sendSettingUpdate();
});

// Dark mode interaction
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('change', function () {
  chrome.storage.sync.set({ darkMode: this.checked });
  sendSettingUpdate();
});

// Load current settings on popup open
chrome.storage.sync.get(
  ['dyslexicFont', 'lineSpacing', 'darkMode'],
  function (result) {
    fontToggle.checked = result.dyslexicFont || false;
    spacingSlider.value = result.lineSpacing || 1.5;
    spacingValue.textContent = `Spacing : ${spacingSlider.value}`;
    darkModeToggle.checked = result.darkMode || false;
  }
);
