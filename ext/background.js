function getUserInput() {
    return browser.storage.sync.get('userInput').then((result) => {
        return result.userInput || null; // Return null if no input is saved
    });
}

function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.status === "complete") {
    getUserInput().then((input) => {
    if (input) {
      fetch(input+new URLSearchParams({
        url: tabInfo.url,
        title: tabInfo.title,
        timestamp: Date.now(),
    }))
    } else {
        console.log('No server_ip:port saved yet. Please set it in extension preference!');
    }
  });
  }
}

browser.tabs.onUpdated.addListener(handleUpdated);


