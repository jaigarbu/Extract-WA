function extraerMensajes() {
  const mensajes = document.querySelectorAll('[data-tab="8"] > div.x1n2onr6') || []
  let ouput = ''

  mensajes.forEach((mensaje) => {
    const dataMessage = mensaje.querySelector('[data-pre-plain-text]').getAttribute('data-pre-plain-text')
    const textMesaage = mensaje.querySelectorAll('._ao3e.selectable-text.copyable-text span')

    if (dataMessage.includes('Soporte Rall-e 2.0')) {
      return
    }
    ouput += `\n${dataMessage} - `

    textMesaage.forEach((texto) => {
      ouput += texto.textContent.trim() + ' '
    })
  })

  console.log(ouput)
  return ouput
}

// Escuchar mensajes desde el popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getChats') {
    const chats = extraerMensajes()
    sendResponse({ data: chats })
  }
})
