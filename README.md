# PressUnlocker

PressUnlocker is a simple Google Chrome extension that enables reading content from some sites that request to disable advertisment blockers.

## Purpose

If you are tired of removing floating components and changing styles so you can read an article, this repository may be of your interest

## Extension Structure

The extension consists of the following files and directories:

```
PressUnlocker/
├── manifest.json
├── background.js
├── config.json
├── popup.html
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```


### File Descriptions

- `manifest.json`: This file describes the extension, its permissions, background script, and icons.
- `background.js`: This script contains the logic to detect when a URL from the specified domains is opened and proceeds to unlock annoying stuff
- `config.json`: This configuration file contains a list of domains to monitor.
- `popup.html`: This HTML file is the popup displayed when the extension icon is clicked.
- `icons/`: This directory contains the icons used for the extension in different sizes (16x16, 48x48, and 128x128 pixels).

## Installation

1. Download or clone the repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch on the top right corner.
4. Click "Load unpacked" and select the `PressUnlocker` folder.
5. Pin the extension by clicking the puzzle piece icon in the toolbar, and then clicking the pin icon next to "PressUnlocker".

## Usage

Once installed, the extension will automatically enable article reading whenever you visit a URL from a domain listed in `config.json`. You can view the logs by opening the Developer Tools (`F12` or `Ctrl+Shift+I`) and navigating to the Console tab.

## Customization

### Updating Domains

To update the list of monitored domains, edit the `config.json` file:

```json
{
  "domains": [
    "example.com",
    "anotherdomain.com",
    "yetanotherdomain.com"
  ]
}

