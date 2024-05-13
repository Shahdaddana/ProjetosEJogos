const PONTEIRO_COLORIDO = 'url("../images/ponteiroColorido.png")'
const PONTEIRO_CINZA = 'url("../images/ponteiroCinza.png")'
const TAMANHO_PONTEIRO = 200
const ROTACOES = [0, 90, 180, 270]
const TAMANHO_LADO = 2
const TOTAL_PONTEIROS = TAMANHO_LADO * TAMANHO_LADO
const PONTEIROS = [0, 2, 1, 3]
const BOTOES_ROTACAO = {
    0: 90,
    1: -90,
}

// Inicialização objetos da IA //
const loc_A = 0
const loc_B = 1
const loc_C = 2
const loc_D = 3
const LOCAIS = [loc_A, loc_B, loc_C, loc_D]
//               'Cima', 'Direita', 'Baixo', 'Esquerda']
const DIRECOES = [ 0,       90,      180,       270]

// objetoOverlay é a DIV que será criada o jogo
// incluirEventos é se os eventos de mouse serão criados
function desenharOverlay(objetoOverlay, incluirEventos) {
    const overlay = document.getElementById(objetoOverlay)
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
            ponteiro.id = objetoOverlay+'_'+PONTEIROS[ponteiroId++]

            // Aleatoriza a posição inicial do ponteiro
            const randomRotation = ROTACOES[Math.floor(Math.random() * ROTACOES.length)]

            // Caso o ponteiro aponte para o Norte, a imagem carregada será em cinza,
            // e ele não poderá girar mais
            if (randomRotation === 0) {
                ponteiro.style.backgroundImage = PONTEIRO_CINZA
                pontuacao--
            } else {
                // Caso contrário, será carregada a imagem colorida
                ponteiro.style.backgroundImage = PONTEIRO_COLORIDO
                ponteiro.style.transform = `rotate(${randomRotation}deg)`

                if (incluirEventos){
                    // Adiciona um evento de clique para girar os ponteiros
                    ponteiro.addEventListener('mousedown', clicarPonteiro)  
                }
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
    rotation += BOTOES_ROTACAO[event.button] || 0

    // Se a rotação atingir 0 graus, remove o evento de clique e troca a imagem
    if ((rotation === 0) || (rotation === 360)){
        ponteiro.removeEventListener('mousedown', clicarPonteiro)
        ponteiro.style.backgroundImage = PONTEIRO_CINZA
    }
    
    ponteiro.style.transform = `rotate(${rotation}deg)`
    ponteiro.dataset.rotation = rotation
}

function atualizarPonteiroVisual(ponteiroId, direcao, idOverlay) {
    const ponteiro = document.getElementById(idOverlay+'_'+ponteiroId)

    // Atualiza a imagem e a rotação do ponteiro com base na direção
    ponteiro.style.transform = 'rotate('+direcao+'deg)'
    if (direcao === 0){
        ponteiro.style.backgroundImage = PONTEIRO_CINZA
    }
    if (direcao === (90 || 180 || 270)){
        ponteiro.style.backgroundImage = PONTEIRO_COLORIDO
    }
    
}

function executarIA(idOverlay) {
    const agente = new AgenteAleatorioJogoPonteiros()
    const ambiente = new AmbienteSimpleJogoDosPonteiros()
    ambiente.addThing(agente)
    let index = 0
    const maxIterations = 400
    const delay = 100
    let elementoContador = document.getElementById('contador')

    function iterar() {
        if (index < maxIterations && agente.alive) {
            for (const [location, direction] of Object.entries(ambiente.status)) {
                atualizarPonteiroVisual(location, direction, idOverlay)
            }

            ambiente.step()
            setTimeout(iterar, delay)
            index++
            elementoContador.textContent = agente.performance
        }
    }
    iterar()
}

////// Inicio da IA //////
class Thing {
    constructor() {}

    toString() {
        return this.constructor.name
    }

    isAlive() {
        // Things that are 'alive' should return true.
        return this.hasOwnProperty('alive') && this.alive
    }

    showState() {
        console.log("I don't know how to show state.")
    }
}

class Agent extends Thing { 
    constructor(program = null) {
        super()
        this.alive = true
        this.bump = false
        this.holding = []
        this.performance = 0

        if (!program || typeof program !== 'function') {
            console.log(`Não foi possível encontrar um programa válido para ${this.constructor.name}, usando o padrão.`)

            program = function (percept) {
                return prompt(`Percept=${percept}; ação?`)
            };
        }

        this.program = program
    }

    canGrab(thing) {
        return false
    }
}

class Environment {
    constructor() {
        this.things = []
        this.agents = []
    }

    thingClasses() {
        return []
    }

    percept(agent) {
        throw new Error('Method percept must be implemented in subclasses.')
    }

    executeAction(agent, action) {
        throw new Error('Method executeAction must be implemented in subclasses.')
    }

    defaultLocation(thing) {
        return null
    }

    exogenousChange() {
    }

    isDone() {
        return !this.agents.some(agent => agent.isAlive())
    }

    step() {
        if (!this.isDone()) {
            const actions = []
            for (const agent of this.agents) {
                if (agent.alive) {
                    actions.push(agent.program(this.percept(agent)))
                } else {
                    actions.push("")
                }
            }

            for (let i = 0; i < this.agents.length; i++) {
                this.executeAction(this.agents[i], actions[i])
            }

            this.exogenousChange()
        }
    }

    run(steps = 1000) {
        for (let step = 0; step < steps; step++) {
            if (this.isDone()) {
                return
            }
            this.step()
        }
    }

    listThingsAt(location, tclass = Thing) {
        /**
         * Return all things exactly at a given location.
         */
        if (typeof location === 'number') {
            return this.things.filter(thing => thing.location === location && thing instanceof tclass)
        }
        
        return this.things.filter(thing => {
            return thing.location.every((val, index) => val === location[index]) && thing instanceof tclass
        })
    }

    someThingsAt(location, tclass = Thing) {
        /**
         * Return true if at least one of the things at location
         * is an instance of class tclass (or a subclass).
         */
        return this.listThingsAt(location, tclass).length !== 0
    }

    addThing(thing, location = null) {
        if (!(thing instanceof Thing)) {
            thing = new Agent(thing)
        }

        if (this.things.includes(thing)) {
            console.log("Can't add the same thing twice");
        } else {
            thing.location = location !== null ? location : this.defaultLocation(thing)
            this.things.push(thing)

            if (thing instanceof Agent) {
                thing.performance = 0
                this.agents.push(thing)
            }
        }
    }

    deleteThing(thing) {
        const index = this.things.indexOf(thing)

        if (index !== -1) {
            this.things.splice(index, 1)

            if (thing instanceof Agent) {
                const agentIndex = this.agents.indexOf(thing)

                if (agentIndex !== -1) {
                    this.agents.splice(agentIndex, 1)
                }
            }
        }
    }
}

class AmbienteSimpleJogoDosPonteiros extends Environment {
    constructor() {
        super()
        this.status = [
            this.obterDirecaoAleatoria(),
            this.obterDirecaoAleatoria(),
            this.obterDirecaoAleatoria(),
            this.obterDirecaoAleatoria(),
        ]
    }
    
    obterDirecaoAleatoria() {
        const indiceAleatorio = Math.floor(Math.random() * DIRECOES.length)
        return DIRECOES[indiceAleatorio]
    }
    
    thingClasses() {
        return [Wall, Dirt, ReflexVacuumAgent, 
            RandomVacuumAgent, TableDrivenVacuumAgent, ModelBasedVacuumAgent]
    }

    percept(agent) {
        return [agent.location, this.status[agent.location]]
    }

    executeAction(agent, action) {
        if (this.status.every(status => status === 0)){
            agent.alive = false
            return
        }
        if ((action == 'GirarH' || action == 'GirarAntiH') && 
        (this.status[agent.location] === 0)){
            return
        }
        if (action === 'Esquerda') {
            if (agent.location === loc_B) {
                agent.location = loc_A
                agent.performance -= 1
            } else if (agent.location === loc_D) {
                agent.location = loc_C
                agent.performance -= 1
            }
        } else if (action === 'Direita') {
            if (agent.location === loc_A) {
                agent.location = loc_B
                agent.performance -= 1
            } else if (agent.location === loc_C) {
                agent.location = loc_D
                agent.performance -= 1
            }
        } else if (action === 'Cima') {
            if (agent.location === loc_A) {
                agent.location = loc_C
                agent.performance -= 1
            } else if (agent.location === loc_B) {
                agent.location = loc_D
                agent.performance -= 1
            }
        } else if (action === 'Baixo') {
            if (agent.location === loc_C) {
                agent.location = loc_A
                agent.performance -= 1
            } else if (agent.location === loc_D) {
                agent.location = loc_B
                agent.performance -= 1
            }
        } 
        
        else if (action == 'GirarH') {
            this.status[agent.location] += 90
            if (this.status[agent.location] === 360){
                this.status[agent.location] = 0
            }
        } 
        
        else if (action == 'GirarAntiH') {
            this.status[agent.location] -= 90
        }
    }
    
    defaultLocation(thing) {
        const randomIndex = Math.floor(Math.random() * LOCAIS.length)
        return LOCAIS[randomIndex]
    }
    
}

function RandomAgentProgram(actions) {
    return function(percept) {
        return actions[Math.floor(Math.random() * actions.length)]
    }
}

function AgenteAleatorioJogoPonteiros() {
    return new Agent(RandomAgentProgram(['Cima', 'Baixo', 'Esquerda', 'Direita', 'GirarH', 'GirarAntiH']))
}
