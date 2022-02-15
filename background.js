
const highlightEnvironment = () => {
  const environmentElement = document.querySelector('[data-test-id="envoralias.label"]')
  const environmentText = environmentElement && environmentElement.textContent
  
  if (environmentText.includes('master')) {
    environmentElement.style = 'border: 5px solid yellow !important; border-radius: 5px; padding: 0 5px;'
  }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      function: highlightEnvironment
    });
  } catch (error) {
    const okErrors = [
      'Cannot access a chrome:// URL',
      'Extension manifest must request permission to access this host.',
    ]
    const errorMessageIsOk = okErrors.some(okError => error.message.includes(okError))

    if (!errorMessageIsOk) throw error
  }
});
