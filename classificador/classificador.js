/**
 * @param {*} elementoFonte Página ou conteúdo em HTML a ser copiado
 * @param {*} elementeDestino Id da div onde o conteúdo será carregado
 */
function carregarElemento(elementoFonte, elementeDestino){
    window.addEventListener('DOMContentLoaded', function() {
        fetch(elementoFonte)
           .then(response => response.text())
           .then(data => {
              document.getElementById(elementeDestino).innerHTML = data
           })
     })
}

function lerFrases(destino) {
   const caixaDeTexto = document.getElementById(destino)
   
   fetch('caixaDeEntrada.txt')
     .then(response => response.text())
     .then(data => {
         const frases = data.split(';')
         const primeiraFrase = frases[0].trim()
         return primeiraFrase;
     })
     .then(primeiraFrase => {
         caixaDeTexto.textContent = primeiraFrase
     })
     .catch(error => {
         caixaDeTexto.textContent = "Erro ao ler arquivo"
     })
}

async function getAuthSheets(){
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    const client = await auth.getClient()
    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    })
    const spreadsheetId = "1Ig5zFv6Djkn8lTQrCiy6qql-kk9FWiOWgRsarNF3ggI"
    return {
        auth, client, googleSheets, spreadsheetId
    }
}