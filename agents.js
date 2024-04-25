const DIRECOES = ['Cima', 'Baixo', 'Esquerda', 'Direita']
const LOCAIS = {
    A: 0,
    B: 1,
    C: 2,
    D: 3
}


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
        if (this.status.every(status => status === 'Cima')){
            agent.alive = false
            return
        }
        if (action === 'Esquerda') {
            if (agent.location === LOCAIS[1]) {
                agent.location = LOCAIS[0]
                agent.performance -= 1
            } else if (agent.location === LOCAIS[3]) {
                agent.location = LOCAIS[2]
                agent.performance -= 1
            }
        } else if (action === 'Direita') {
            if (agent.location === LOCAIS[0]) {
                agent.location = LOCAIS[1]
                agent.performance -= 1
            } else if (agent.location === LOCAIS[2]) {
                agent.location = LOCAIS[3]
                agent.performance -= 1
            }
        } else if (action === 'Cima') {
            if (agent.location === LOCAIS[0]) {
                agent.location = LOCAIS[2]
                agent.performance -= 1
            } else if (agent.location === LOCAIS[1]) {
                agent.location = LOCAIS[3]
                agent.performance -= 1
            }
        } else if (action === 'Baixo') {
            if (agent.location === LOCAIS[2]) {
                agent.location = LOCAIS[0]
                agent.performance -= 1
            } else if (agent.location === LOCAIS[3]) {
                agent.location = LOCAIS[1]
                agent.performance -= 1
            }
        } 
        
        else if (action == 'GirarH') {
            if (this.status[agent.location] == 'Cima'){
                this.status[agent.location] = 'Cima'
            } else if (this.status[agent.location] == 'Direita'){
                this.status[agent.location] = 'Baixo'
            } else if (this.status[agent.location] == 'Baixo'){
                this.status[agent.location] = 'Esquerda'
            } else if (this.status[agent.location] == 'Esquerda'){
                this.status[agent.location] = 'Cima'
            }
        } else if (action == 'GirarAntiH') {
            if (this.status[agent.location] == 'Cima'){
                this.status[agent.location] = 'Cima'
            } else if (this.status[agent.location] == 'Esquerda'){
                this.status[agent.location] = 'Baixo'
            } else if (this.status[agent.location] == 'Baixo'){
                this.status[agent.location] = 'Direita'
            } else if (this.status[agent.location] === 'Direita'){
                this.status[agent.location] = 'Cima'
            }
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

const agente = new AgenteAleatorioJogoPonteiros()
const ambiente = new AmbienteSimpleJogoDosPonteiros()
ambiente.addThing(agente)

for (let index = 0; index < 100; index++) {
    ambiente.step()
    console.log(ambiente.status)
}
