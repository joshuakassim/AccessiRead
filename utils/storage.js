const defaultSettings = {
  dyslexicFont: false,
  darkMode: false,
  lineSpacing: 1.5,
};

export function loadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(defaultSettings, (storedSettings) => {
      resolve({ ...defaultSettings, ...storedSettings });
    });
  });
}

export function saveSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(settings, resolve);
  });
}

export function resetSettings() {
  return saveSettings(defaultSettings);
}
