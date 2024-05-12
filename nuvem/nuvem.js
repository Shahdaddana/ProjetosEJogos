const botaoEnviar = document.getElementById('botaoEnviar')
const areaTexto = document.getElementById('areaTexto')
const imagemNuvem = document.getElementById('imagemNuvemPalavras')

botaoEnviar.addEventListener('click', () => {
  const texto = areaTexto.value.trim()

  const postData = {
    format: "png",
    width: 500,
    height: 500,
    fontFamily: "sans-serif",
    fontScale: 15,
    scale: "linear",
    text: texto
  }

  fetch('https://quickchart.io/wordcloud', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao fazer a requisição')
    }
    return response.blob()
  })
  .then(blob => {
    const imageUrl = URL.createObjectURL(blob)
    // Atualizar o atributo src da imagem para exibir a nuvem de palavras
    imagemNuvem.src = imageUrl
  })
  .catch(error => {
    console.error('Erro:', error)
  })
})
