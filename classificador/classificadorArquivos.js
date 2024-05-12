const codigo = 'AKfycbwaECTDwCt2_QJ7TaFxNp5VvtKCqcbAZQHhFS1hxEoBNYICwU-ryrpE9GfdM2t0247hgA'
const urlPlanilha = 'https://script.google.com/macros/s/'+codigo+'/exec'


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

async function eventoToogle(idElemento) {
    toggleSwitch.addEventListener('change', () => {
        const toogle = document.getElementById(idElemento)
        const isChecked = toogle.checked
        const newLanguage = isChecked ? 'pt' : 'en'
        console.log(newLanguage)
    })
}

// Atualiza as variaveis locais com os dados da ultima linha da planilha
async function obterComentarios() { // GET
  try {
      const response = await fetch(urlPlanilha)
      if (!response.ok) {
          throw new Error('Erro ao receber texto')
      }
      const data = await response.json()
      return data.saida
  } catch (error) {
      console.error('Erro ao receber texto', error)
      return []
  }
}

// Funcao genérica de POST
async function post(dados) {
  try {
      const resposta = await fetch(urlPlanilha, {
          redirect: "follow",
          method: 'POST',
          body: JSON.stringify(dados),
          headers: {
              'Content-Type': 'text/html',
              'charset': 'UTF-8'
          },
      })
      
      if (resposta.ok) {
          console.log('Requisição POST enviada com sucesso');
      } else {
          console.error('Erro ao enviar requisição POST', resposta.status)
      }
  } catch (erro) {
      console.error('Erro ao enviar requisição POST', erro)
  }
}

async function postarComentario(comentario) { // POST
  const dados = {
    funcao: 'postarComentario',
    valor: comentario,
  }
  post(dados)
}

async function aprovarComentario(id, valor) { // POST
  console.log(id, valor)
  const dados = {
    funcao: 'aprovarComentario',
    id,
    valor,
  }
  post(dados)
}

function eventoBotao(idBotao, idComentario){
  let aprovado = 'TRUE'
  if (idBotao == 'botaoRejeitar'){
    aprovado = 'FALSE'
  }
  const botao = document.getElementById(idBotao)

  botao.addEventListener('click', function() {
    aprovarComentario(idComentario, aprovado)
  })
}

///////////////////
function criarCards(comentarios) {
  const cardContainer = document.getElementById('card-container')

  // Limpa o conteúdo existente no contêiner de cartões
  cardContainer.innerHTML = ''

  // Itera sobre os comentários e cria um card para cada um
  comentarios.forEach(comentario => {
    const col = document.createElement('div')
    col.classList.add('col-md-4', 'mb-4')

    const card = document.createElement('div')
    card.classList.add('card')

    // Estilize o card com base no valor do comentário
    if (comentario[2] == false){
      card.classList.add('rejeitado')
    }
    card.classList.add('aprovado')
    

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    cardBody.style.writingMode = "horizontal-tb"

    // Coloca o comentário no Card
    cardBody.textContent = comentario[1]

    card.appendChild(cardBody)
    col.appendChild(card)
    cardContainer.appendChild(col)
  })
}


