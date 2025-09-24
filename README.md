# Clean Copy

Clean Copy is a simple browser extension that removes all formatting from the selected text before copying it to the clipboard. It provides a context menu and keyboard shortcut to quickly copy plain text, making it ideal for users who frequently need to strip formatting from copied content.

## Features
- Copy selected text as plain text (removes all formatting)
- Accessible via context menu or keyboard shortcut
- Lightweight and privacy-friendly

## Installation

1. Clone or download this repository to your local machine.
2. Open your browser's Extensions page (e.g., `chrome://extensions/` for Chrome).
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the root folder of this project.

## Usage

- **Context Menu:** Select any text on a webpage, right-click, and choose **"Copy plain text to the clipboard (Ctrl+Shift+X)"** (on Mac: **Cmd+Shift+X**).
- **Keyboard Shortcut:** Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac) to copy the selected text as plain text.

## Permissions

| Permission      | Purpose                                                      |
|----------------|--------------------------------------------------------------|
| contextMenus   | Add a right-click menu for copying plain text                |
| scripting      | Inject scripts to access and copy selected text               |
| <all_urls>     | Allow operation on all websites (for selection/copy support) |

## Folder Structure

```
cleancopy/
├── manifest.json
├── worker.js
├── data/
│   └── icons/
│       ├── 16.png
│       ├── 32.png
│       └── 64.png
```

## Privacy

Clean Copy does **not** collect, store, or transmit any user data. All operations are performed locally in your browser. No analytics or tracking scripts are included.

## Development

- Edit `worker.js` for background logic and context menu/shortcut handling.
- Update `manifest.json` for permissions, commands, and extension metadata.
- Icons are located in `data/icons/`.
- Reload the extension in your browser after making changes.

## Roadmap

- [ ] Add options page for user customization
- [ ] Support for additional browsers (Firefox, Edge)
- [ ] Improved error handling and notifications
- [ ] Publish to Chrome Web Store ([TODO: Add link])

## Contributing

Contributions are welcome! Please open issues or submit pull requests for bug fixes, features, or improvements.

## License

[MIT](LICENSE)
