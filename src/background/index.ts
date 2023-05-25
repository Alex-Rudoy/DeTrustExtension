chrome.runtime.onMessage.addListener((request) => {
  if (request.detrustOpenPopup) {
    chrome.windows.create({
      url: chrome.runtime.getURL('popup.html'),
      type: 'popup',
      height: 500,
      width: 350,
    });
  }
});
