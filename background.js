chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadChats') {
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        func: () => {
          return extractMessages()
        },
      },
      (results) => {
        if (results && results[0].result) {
          const blob = new Blob([results[0].result.join('\n')], { type: 'text/plain' })
          const url = URL.createObjectURL(blob)
          chrome.downloads.download({
            url: url,
            filename: 'whatsapp_chats.txt',
          })
        }
      },
    )
  }
})
