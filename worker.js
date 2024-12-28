'use strict';

// Context Menu
{
  const callback = () => {
    chrome.contextMenus.create({
      id: 'copy-plain',
      title: 'Copy plain text to the clipboard',
      contexts: ['selection'] // Show only when text is selected
    });
  };
  chrome.runtime.onInstalled.addListener(callback);
  chrome.runtime.onStartup.addListener(callback);
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const method = info.menuItemId || '';
  let selected = info.selectionText;

  try {
    // Attempt to get selected text
    const a = await chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
        frameIds: [info.frameId]
      },
      func: () => window.getSelection().toString().trim()
    });

    if (a && a.length && a[0].result) {
      selected = a[0].result;
    }
  } catch (e) {
    console.warn('Failed to fetch selected text:', e);
  }

  if (method === 'copy-plain' && selected) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: msg => {
          navigator.clipboard.writeText(msg).then(() => {
            const t = document.title;
            document.title = 'Selected text is copied as plain text';
            setTimeout(() => (document.title = t), 750);
          }).catch(e => alert(e.message));
        },
        args: [selected]
      });
    } catch (e) {
      console.error('Failed to copy plain text:', e);
    }
  }
});
