// Font interaction
const fontToggle = document.getElementById('font-toggle');
fontToggle.addEventListener('change', function () {
  chrome.storage.sync.set({ dyslexicFont: this.checked });
});

// Slider interation
const spacingSlider = document.getElementById('spacing-slider');
const spacingValue = document.getElementById('spacing-value');

spacingSlider.addEventListener('input', function () {
  spacingValue.textContent = `Spacing : ${this.value}`;
  chrome.storage.sync.set({ lineSpacing: this.value });
});

// Dark mode interaction
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('change', function () {
  chrome.storage.sync.set({ darkMode: this.checked });
});

chrome.storage.sync.get(
  ['dyslexicFont', 'lineSpacing', 'darkMode'],
  function (result) {
    fontToggle.checked = result.dyslexicFont || false;
    spacingSlider.value = result.lineSpacing || 1.5;
    spacingValue.textContent = `Spacing : ${spacingSlider.value}`;
    darkModeToggle.checked = result.darkMode || false;
  }
);
