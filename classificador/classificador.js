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

/*

async function getAuthSheets(){
    const auth = new GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    const client = await auth.getClient()
    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    })
    const spreadsheetId = "1Ig5zFv6Djkn8lTQrCiy6qql-kk9FWiOWgRsarNF3ggI"
    return { client }
}

async function getRows(){

    const { googleSheets, auth, spreadsheetId } = await getAuthSheets()

    const getRows = await googleSheets.spreadsheets.value({
        auth,
        spreadsheetId,
        range: "pagina"
    })
}




const apiKey = "credentials.json"
const spreadsheetId = '1Ig5zFv6Djkn8lTQrCiy6qql-kk9FWiOWgRsarNF3ggI'
const range = 'pagina'

function testar() {
    gapi.load('client', initClient);
}



function initClient() {
    gapi.client.init({
        'apiKey': apiKey,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']
    }).then(function() {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: range,
        })
    }).then(function(response) {
        const rangeData = response.result.values;
        if (rangeData.length > 0) {
            console.log('Dados obtidos:');
            rangeData.forEach(row => {
                console.log(`${row[0]}, ${row[1]}`)
            })
        } else {
            console.log('Nenhum dado encontrado.')
        }
    }, function(error) {
        console.error('Erro ao ler os dados:', error)
    })
}

*/