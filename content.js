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

async function cargarMensajesConScroll(repeticiones = 3, delay = 1500) {
  const scrollContainer = document.querySelector('div.x1rife3k')
  if (!scrollContainer) {
    console.error('No se encontró el contenedor del scroll')
    return ''
  }

  let todosLosMensajes = new Set() // usamos Set para evitar duplicados

  for (let i = 0; i < repeticiones; i++) {
    // ejecutar tu función y guardar mensajes
    const batch = extraerMensajes()
    batch.split('\n').forEach((line) => {
      if (line.trim() !== '') todosLosMensajes.add(line.trim())
    })

    // mover scroll hacia arriba
    scrollContainer.scrollTop = 0

    // esperar a que carguen mensajes
    await new Promise((r) => setTimeout(r, delay))
  }

  return Array.from(todosLosMensajes).join('\n')
}

// Escuchar mensajes desde el popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getChats') {
    cargarMensajesConScroll(5, 2000).then((chats) => {
      // 5 repeticiones, 2 segundos de espera
      sendResponse({ data: chats })
    })
    return true // importante para asincronía
  }
})
