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

async function lerPanilha(idTextoGrande, idTextoPequeno){
    const textoGrande = document.getElementById(idTextoGrande)
    const textoPequeno = document.getElementById(idTextoPequeno)
    const amount = '1'
    const category = ''
    const difficulty = ''
    const type = 'boolean'
    const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro ao obter pergunta')
        }
        return response.json()
    })
    .then(data => {
        const pergunta = data.results[0].question
        const respostaCerta = data.results[0].correct_answer
        
        textoGrande.innerHTML = pergunta
        textoPequeno.innerText = respostaCerta
        const caixaPequena = document.getElementById('idCaixaPequena')
        caixaPequena.classList.add(respostaCerta)
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

async function receber(){
    const url = 'https://script.google.com/macros/s/AKfycbzQ9_15V49dB9G0fh2tu8hglBw780gKycTqmuTkftq2JhWAvU5D3kGEl9KF1SiLiKJQbg/exec'

    fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro ao obter pergunta')
        }
        return response.json()
    })
    .then(data => {
        console.log(data.saida)
        return "ola"
        const pergunta = data.results[0].question
        const respostaCerta = data.results[0].correct_answer
        
        textoGrande.innerHTML = pergunta
        textoPequeno.innerText = respostaCerta
        const caixaPequena = document.getElementById('idCaixaPequena')
        caixaPequena.classList.add(respostaCerta)
    })
    .catch(error => {
        console.error('Erro ao obter pergunta:', error);
    })
    
}

async function planilhaPost(mensagem) {
    const url = 'https://script.google.com/macros/s/AKfycby11FAooFaA98cw_LlwtASLJeKkD_XgUMe69_WJfaZEK7qBuFoFdCCQ84uyvZDyZIfLbg/exec';
    const dados = {
      valor: mensagem
    }
  
    try {
      const resposta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });
  
      if (resposta.ok) {
        console.log('Requisição POST enviada com sucesso!');
      } else {
        console.error('Erro ao enviar requisição POST:', resposta.status);
      }
    } catch (erro) {
      console.error('Erro ao enviar requisição POST:', erro);
    }
}
