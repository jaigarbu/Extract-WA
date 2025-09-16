document.getElementById('extract').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getChats' }, (response) => {
      if (response && response.data) {
        const blob = new Blob([response.data], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        chrome.downloads.download({
          url: url,
          filename: 'whatsapp_chats.txt',
        })
      }
    })
  })
})
