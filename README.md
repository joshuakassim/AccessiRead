# AccessiRead

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

AccessiRead is a Chrome browser extension designed to enhance web readability for individuals with dyslexia, ADHD, visual processing disorders, and other reading difficulties. It dynamically reformats web content by applying evidence-based adjustments such as specialized fonts, increased line spacing, and color themes, making online reading more accessible and comfortable.

## Features

- **OpenDyslexic Font Support**: Toggle the OpenDyslexic font family, which is specifically designed to improve readability for people with dyslexia by altering letter shapes to reduce confusion.
- **Adjustable Line Spacing**: Customize line height from 1x to 5x to reduce visual crowding and improve text flow.
- **Dark Mode**: Switch to a high-contrast dark theme to reduce eye strain, especially in low-light environments.
- **Live Preview**: In the options page, see real-time changes to a sample text block as you adjust settings.
- **Persistent Settings**: All preferences are saved locally using Chrome's storage API and applied across all websites.
- **Universal Compatibility**: Works on all websites via content scripts that inject styles dynamically.

## Installation

### From Chrome Web Store (Recommended)

1. Visit the [Chrome Web Store page for AccessiRead](https://chromewebstore.google.com/detail/accessiread/gineleoboghgbehbhciacknamllpehid)
2. Click "Add to Chrome".
3. Confirm the installation in the popup.

### Manual Installation (For Development/Testing)

1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right.
4. Click "Load unpacked" and select the `AccessiRead/` folder.
5. The extension will be installed and appear in your extensions list.

## Usage

1. **Quick Toggle**: Click the AccessiRead icon in the Chrome toolbar to open the popup and adjust settings on the fly.
2. **Advanced Settings**: Right-click the extension icon and select "Options" or visit `chrome://extensions/` and click "Details" > "Extension options" for the full settings page with live preview.
3. **Automatic Application**: Once enabled, settings apply to all open tabs and new pages automatically.

### Settings Overview

- **Enable OpenDyslexic Font**: Applies the OpenDyslexic font to text elements on web pages.
- **Increase Line Spacing**: Adjusts the line height for better readability.
- **Dark Mode**: Inverts colors to a dark background with light text.

## Permissions

AccessiRead requires the following permissions to function:

- **activeTab**: To modify the content of the currently active tab.
- **storage**: To save and retrieve user settings.
- **scripting**: To inject content scripts into web pages.
- **tabs**: To manage tab-specific operations.
- **Host Permissions ("https://\*/\*", "http://\*/\*")**: To apply changes to any website.

These permissions are used solely for enhancing readability and do not collect or transmit personal data.

## Screenshots

- ### Popup Interface

  ##### <img width="701" height="788" alt="image" src="https://github.com/user-attachments/assets/f24287f1-7c91-4ed8-8643-a379e0e1619a" />

- ### Options Page with Live Preview

  ##### ![AR options preview Gif](https://github.com/user-attachments/assets/d336d68b-e16c-4821-82ac-8150420960b0)

- ### Before/After Example on a Web Page

  ##### <img width="1919" height="977" alt="image" src="https://github.com/user-attachments/assets/9a9a6aba-582d-44f3-bc9a-143b78b8475e" />

  ##### <img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/dfca56a6-4a6f-4613-945f-1b3d040f09cc" />

## Contributing

We welcome contributions to improve AccessiRead! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Submit a pull request with a clear description of your changes.

For major changes, please open an issue first to discuss your ideas.

### Development Setup

- Load the extension in Chrome as described in the Installation section.
- Use Chrome DevTools to debug content scripts and background processes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Joshua Kassim**

- GitHub: [joshuakassim](https://github.com/joshuakassim)
- Email: joshuakassim6@gmail.com.com

## Acknowledgments

- OpenDyslexic font by [OpenDyslexic](https://opendyslexic.org/).
- Inspired by research on dyslexia and web accessibility standards.

## Changelog

### Version 1.0

- Initial release with core features: font toggle, line spacing, dark mode.
- Basic popup and options pages.
- Keyboard shortcut support.

---

_AccessiRead is not affiliated with any medical organization and is not a substitute for professional advice. If you have reading difficulties, consult with healthcare professionals for personalized recommendations._
