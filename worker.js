'use strict';

// Define keyboard shortcut hint based on the user's platform
const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const shortcutHint = isMac ? '(Cmd+Shift+X)' : '(Ctrl+Shift+X)';


// Context Menu Setup
const setupContextMenu = () => {
  chrome.contextMenus.create({
    id: 'copy-plain',
    title: `Copy plain text to the clipboard ${shortcutHint}`,
    contexts: ['selection'], // Show only when text is selected
  });
};

// Handle Context Menu Click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'copy-plain') {
    handleCopyAction(tab, info.frameId);
  }
});

// Handle Keyboard Shortcut
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'copy_plain_text') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      handleCopyAction(tab);
    }
  }
});

async function handleCopyAction(tab, frameId = null) {
    try {
      // Attempt to get the selected text
      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id, frameIds: frameId ? [frameId] : undefined },
        func: () => window.getSelection().toString().trim(),
      });
  
      if (result && result[0]?.result) {
        const selectedText = result[0].result;
  
        // Inject clipboard logic into the active tab
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (text) => {
            navigator.clipboard.writeText(text).then(() => {
              console.log('Text copied to clipboard:', text);
            }).catch((err) => {
              console.error('Failed to write to clipboard:', err);
              alert('Failed to copy text: ' + err.message);
            });
          },
          args: [selectedText],
        });
      } else {
        console.warn('No text selected.');
      }
    } catch (err) {
      console.error('Failed to copy plain text:', err);
    }
  }
  // Initialize Context Menu
chrome.runtime.onInstalled.addListener(setupContextMenu);
chrome.runtime.onStartup.addListener(setupContextMenu);