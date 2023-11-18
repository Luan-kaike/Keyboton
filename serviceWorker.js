chrome.runtime.onInstalled.addListener(() => {
  const configBasic = { theme: true, dev: false }
  chrome.storage.sync.set(configBasic)
})