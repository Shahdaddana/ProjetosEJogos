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

async function gerarFrase(idTextoGrande, idTextoPequeno){
    const textoGrande = document.getElementById(idTextoGrande)
    const textoPequeno = document.getElementById(idTextoPequeno)
    const amount = '1'
    const category = ''
    const difficulty = ''
    const type = 'boolean'
    const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`

    // Amount: 1-10
    // Difficulty: easy, medium, hard
    // Type: multiple, boolean
    /* Category:
    9 General Knowledge
    10 Entertainment: Books
    11 Entertainment: Film
    12 Entertainment: Music
    13 Entertainment: Musicals & Theatres
    14 Entertainment: Television
    15 Entertainment: Video Games
    16 Entertainment: Board Games
    17 Science & Nature
    18 Science: Computers
    19 Science: Mathematics
    20 Mythology
    21 Sports
    22 Geography
    23 History
    24 Politics
    25 Art
    26 Celebrities
    27 Animals
    28 Vehicles
    29 Entertainment: Comics
    30 Science: Gadgets
    31 Entertainment: Japanese Anime & Manga
    32 Entertainment: Cartoon & Animations */

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro ao obter pergunta')
        }
        return response.json()
    })
    .then(data => {
        const pergunta = data.results[0].question
        //const category = data.results[0].category
        //const difficulty = data.results[0].difficulty
        const respostaCerta = data.results[0].correct_answer
        //const incorrectAnswers = data.results[0].incorrect_answers

        // Exibe a pergunta e outras informações
        //console.log('Categoria:', category);
        //console.log('Dificuldade:', difficulty);
        //console.log('Pergunta:', question);
        //console.log('Resposta correta:', correctAnswer);
        //console.log('Respostas incorretas:', incorrectAnswers);
        //console.log(data.results[0].question)
        textoGrande.innerHTML = pergunta
        textoPequeno.innerText = respostaCerta
        const caixaPequena = document.getElementById('idCaixaPequena')
        caixaPequena.classList.add(respostaCerta);

        



    })
    .catch(error => {
        console.error('Erro ao obter pergunta:', error);
    })
}

async function eventoToogle(idElemento) {
    toggleSwitch.addEventListener('change', () => {
        const toogle = document.getElementById(idElemento)
        const isChecked = toogle.checked
        const newLanguage = isChecked ? 'pt' : 'en'
        console.log(newLanguage)
    })
}
