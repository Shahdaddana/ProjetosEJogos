const MAX_Y = 512

function gerarNumero(){
    //                 Limite Superior ↓     ↓---------↓ Limite Inferior
    return Math.floor(Math.random() * (500 - 0 + 1)) + 0
}

function listaDePontos(limite){
    for (let i = 0; i < limite; i++) {
        desenharPonto(gerarNumero(), gerarNumero())
    }
}

function adicionarDica(ponto){
    ponto.addEventListener('mouseover', function() {
        const tooltip = document.createElement('div')
        tooltip.classList.add("tooltip")
        tooltip.textContent = `(${this.dataset.x}, ${this.dataset.y})`
        tooltip.style.left = this.offsetLeft + 'px'
        tooltip.style.top = (this.offsetTop - 30) + 'px'
        document.getElementById("plano").appendChild(tooltip)
    })
        
    ponto.addEventListener('mouseout', function() {
        const tooltip = document.querySelector('.tooltip')
        if (tooltip) {
            tooltip.remove()
        }
    })
    
}

function desenharPonto(x, y) {
    const plano = document.getElementById("plano")
    const pontoNoPlano = document.createElement("div")
    pontoNoPlano.classList.add("point")
    pontoNoPlano.style.left = x + "px"
    pontoNoPlano.dataset.x = x
    pontoNoPlano.style.top = MAX_Y - y + "px"
    pontoNoPlano.dataset.y = y
    plano.appendChild(pontoNoPlano)
    adicionarDica(pontoNoPlano)
}


function desenharComClick(){
    const plano = document.getElementById("plano")
    plano.addEventListener('click', function(event) {
        let x = event.clientX - this.offsetLeft
        let y = event.clientY - this.offsetTop
        y = MAX_Y - y
        desenharPonto(x-361, y+387)
    })
}