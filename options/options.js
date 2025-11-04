import { loadSettings, saveSettings, resetSettings } from '../utils/storage.js';

// --- DOM Elements ---
const fontToggle = document.getElementById('font-toggle');
const spacingSlider = document.getElementById('spacing-slider');
const spacingValue = document.getElementById('spacing-value');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const resetButton = document.getElementById('reset-button');
const preview = document.getElementById('live-preview');

// Updates the live preview based on current control values.

function updatePreview() {
  const lineSpacing = spacingSlider.value;

  // Update slider display
  spacingValue.textContent = spacingSlider.value;

  // Apply styles to the preview area using CSS variables
  preview.style.setProperty('--preview-line-height', lineSpacing);

  // Set font family based on toggle
  preview.style.setProperty(
    '--preview-font-family',
    fontToggle.checked ? "'OpenDyslexic'" : 'Arial, sans-serif'
  );

  // Set colors based on dark mode toggle
  preview.style.setProperty(
    '--preview-bg',
    darkModeToggle.checked ? '#121212' : '#ffffff'
  );
  preview.style.setProperty(
    '--preview-color',
    darkModeToggle.checked ? '#e0e0e0' : '#000000'
  );
}

// Loads settings from storage and populates the controls.

async function loadOptions() {
  const settings = await loadSettings();

  // Populate controls
  spacingSlider.value = settings.lineSpacing;
  fontToggle.checked = settings.dyslexicFont;
  darkModeToggle.checked = settings.darkMode;

  // Update the preview area
  updatePreview();
}

// Saves a setting when a control value changes.
async function saveOption(key, value) {
  await saveSettings({ [key]: value });
  updatePreview(); // Update preview after saving
  console.log(`Setting '${key}' saved.`);

  // Send a message to the background script to notify active tabs
  chrome.runtime.sendMessage({ action: 'UPDATE_SETTINGS' });
}

// Listen for input changes on the Line Spacing slider
spacingSlider.addEventListener('input', function () {
  spacingValue.textContent = `Spacing : ${this.value}`;
  saveOption('lineSpacing', parseInt(spacingSlider.value));
});

// Listen for changes on the Dyslexic Font toggle
fontToggle.addEventListener('change', function () {
  saveOption('dyslexicFont', this.checked);
});

// Listen for changes on the Dark Mode toggle
darkModeToggle.addEventListener('change', function () {
  saveOption('darkMode', this.checked);
});

// Reset Button Handler
resetButton.addEventListener('click', async () => {
  await resetSettings();
  await loadOptions();

  // Send message to background to update active tabs immediately
  chrome.runtime.sendMessage({ action: 'UPDATE_SETTINGS' });
});

// Initial Load
document.addEventListener('DOMContentLoaded', loadOptions);
