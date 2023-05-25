chrome.runtime.onMessage.addListener((request) => {
  if (request.detrustOpenPopup) {
    chrome.tabs.query({}, (tabs) => {
      let foundOpenPopup = false;
      for (let i = tabs.length - 1; i >= 0; i--) {
        if (
          tabs[i].url === `chrome-extension://${chrome.runtime.id}/popup.html`
        ) {
          chrome.windows.update(tabs[i].windowId, { focused: true });
          foundOpenPopup = true;
          break;
        }
      }
      if (!foundOpenPopup) {
        chrome.windows.create({
          url: chrome.runtime.getURL('popup.html'),
          type: 'popup',
          height: 500,
          width: 350,
        });
      }
    });
  }
});
