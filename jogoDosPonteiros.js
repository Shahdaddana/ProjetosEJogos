const TAMANHO_PONTEIRO = 200
const ROTACOES = [0, 90, 180, 270]
const TAMANHO_LADO = 2
const TOTAL_PONTEIROS = TAMANHO_LADO * TAMANHO_LADO
const PONTEIROS = [0, 2, 1, 3]


function desenharOverlay() {
    const overlay = document.getElementById("overlay")
    overlay.innerHTML = ''
    overlay.style.display = 'flex'
    overlay.style.flexDirection = 'row'
    let pontuacao = TOTAL_PONTEIROS
    let ponteiroId = 0

    for (let i = 0; i < TAMANHO_LADO; i++) {

        // Cria uma linha
        const row = document.createElement('div')
        row.classList.add('row')

        for (let j = 0; j < TAMANHO_LADO; j++) {
            // Cria um ponteiro
            const ponteiro = document.createElement('div')
            ponteiro.classList.add('ponteiro')
            ponteiro.style.width = `${TAMANHO_PONTEIRO}px`
            ponteiro.style.height = `${TAMANHO_PONTEIRO}px`
            ponteiro.style.backgroundSize = 'contain'
            ponteiro.id = PONTEIROS[ponteiroId++]

            // Aleatoriza a posição inicial do ponteiro
            const randomRotation = ROTACOES[Math.floor(Math.random() * ROTACOES.length)]

            // Caso o ponteiro aponte para o Norte, a imagem carregada será em cinza,
            // e ele não poderá girar mais
            if (randomRotation === 0) {
                ponteiro.style.backgroundImage = 'url("images/ponteiroCinza.png")'
                pontuacao--
            } else {
                // Caso contrário, será carregada a imagem colorida
                ponteiro.style.backgroundImage = 'url("images/ponteiroColorido.png")'
                ponteiro.style.transform = `rotate(${randomRotation}deg)`

                // Adiciona um evento de clique para girar os ponteiros
                ponteiro.addEventListener("click", clicarPonteiro)  
            }
            // Adiciona o ponteiro à linha
            row.appendChild(ponteiro)
        }
        // Adiciona a linha ao overlay
        overlay.appendChild(row)
    }
}

function clicarPonteiro(event) {
    const ponteiro = event.target
    let rotation = parseInt(ponteiro.style.transform.replace('rotate(', '').replace('deg)', ''))
    rotation += 90
    
    // Se a rotação atingir 0 graus, remove o evento de clique e troca a imagem
    if ((rotation === 0) || (rotation === 360)){
        ponteiro.removeEventListener('click', clicarPonteiro)
        ponteiro.style.backgroundImage = 'url("images/ponteiroCinza.png")';
    }
    
    ponteiro.style.transform = `rotate(${rotation}deg)`
    ponteiro.dataset.rotation = rotation
}
