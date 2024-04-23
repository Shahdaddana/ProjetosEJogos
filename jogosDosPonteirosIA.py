from statistics import mean
from time import sleep

import random
import copy
import collections
import numbers

class Thing:
    
    def __repr__(self):
        return '<{}>'.format(getattr(self, '__name__', self.__class__.__name__))

    def is_alive(self):
        """Things that are 'alive' should return true."""
        return hasattr(self, 'alive') and self.alive

    def show_state(self):
        """Display the agent's internal state. Subclasses should override."""
        print("I don't know how to show_state.")

    def display(self, canvas, x, y, width, height):
        """Display an image of this Thing on the canvas."""
        # Do we need this?
        pass

class Agent(Thing):

    def __init__(self, program=None):
        self.alive = True
        self.bump = False
        self.holding = []
        self.performance = 0
        if program is None or not isinstance(program, collections.abc.Callable):
            print("Can't find a valid program for {}, falling back to default.".format(self.__class__.__name__))

            def program(percept):
                return eval(input('Percept={}; action? '.format(percept)))

        self.program = program

    def can_grab(self, thing):
        """Return True if this agent can grab this thing.
        Override for appropriate subclasses of Agent and Thing."""
        return False
    
def RandomAgentProgram(actions):
    return lambda percept: random.choice(actions)

loc_A = 0
loc_B = 1
loc_C = 2
loc_D = 3

def AgenteAleatorioJogoPonteiros():
    return Agent(RandomAgentProgram(['Esquerda', 'Direita', 'Cima', 'Baixo', 'GirarH', 'GirarAntiH']))

class Environment:

    def __init__(self):
        self.things = []
        self.agents = []

    def thing_classes(self):
        return []  # List of classes that can go into environment

    def percept(self, agent):
        """Return the percept that the agent sees at this point. (Implement this.)"""
        raise NotImplementedError

    def execute_action(self, agent, action):
        """Change the world to reflect this action. (Implement this.)"""
        raise NotImplementedError

    def default_location(self, thing):
        """Default location to place a new thing with unspecified location."""
        return None

    def exogenous_change(self):
        """If there is spontaneous change in the world, override this."""
        pass

    def is_done(self):
        """By default, we're done when we can't find a live agent."""
        return not any(agent.is_alive() for agent in self.agents)

    def step(self):
        """Run the environment for one time step. If the
        actions and exogenous changes are independent, this method will
        do. If there are interactions between them, you'll need to
        override this method."""
        if not self.is_done():
            actions = []
            for agent in self.agents:
                if agent.alive:
                    actions.append(agent.program(self.percept(agent)))
                else:
                    actions.append("")
            for (agent, action) in zip(self.agents, actions):
                self.execute_action(agent, action)
            self.exogenous_change()

    def run(self, steps=1000):
        """Run the Environment for given number of time steps."""
        for step in range(steps):
            if self.is_done():
                return
            self.step()

    def list_things_at(self, location, tclass=Thing):
        """Return all things exactly at a given location."""
        if isinstance(location, numbers.Number):
            return [thing for thing in self.things
                    if thing.location == location and isinstance(thing, tclass)]
        return [thing for thing in self.things
                if all(x == y for x, y in zip(thing.location, location)) and isinstance(thing, tclass)]

    def some_things_at(self, location, tclass=Thing):
        """Return true if at least one of the things at location
        is an instance of class tclass (or a subclass)."""
        return self.list_things_at(location, tclass) != []

    def add_thing(self, thing, location=None):
        """Add a thing to the environment, setting its location. For
        convenience, if thing is an agent program we make a new agent
        for it. (Shouldn't need to override this.)"""
        if not isinstance(thing, Thing):
            thing = Agent(thing)
        if thing in self.things:
            print("Can't add the same thing twice")
        else:
            thing.location = location if location is not None else self.default_location(thing)
            self.things.append(thing)
            if isinstance(thing, Agent):
                thing.performance = 0
                self.agents.append(thing)

    def delete_thing(self, thing):
        """Remove a thing from the environment."""
        try:
            self.things.remove(thing)
        except ValueError as e:
            print(e)
            print("  in Environment delete_thing")
            print("  Thing to be removed: {} at {}".format(thing, thing.location))
            print("  from list: {}".format([(thing, thing.location) for thing in self.things]))
        if thing in self.agents:
            self.agents.remove(thing)
        
class Ponteiro(Thing):
    orientação = "";
    pass

class AmbienteSimplesJogoPonteiros(Environment):
    
    def __init__(self):
        super().__init__()
        self.status = {loc_A: random.choice(['Esquerda', 'Direita', 'Cima', 'Baixo']),
                       loc_B: random.choice(['Esquerda', 'Direita', 'Cima', 'Baixo']),
                       loc_C: random.choice(['Esquerda', 'Direita', 'Cima', 'Baixo']),
                       loc_D: random.choice(['Esquerda', 'Direita', 'Cima', 'Baixo'])}

    def thing_classes(self):
        return [Ponteiro, AgenteAleatorioGamePonteiros]

    def percept(self, agent):
        return agent.location, self.status[agent.location]

    def execute_action(self, agent, action):
        if ((action == 'Esquerda') and (agent.location == loc_B)):
            agent.location = loc_A
            agent.performance -= 1
        elif ((action == 'Esquerda') and (agent.location == loc_D)):
            agent.location = loc_C
            agent.performance -= 1
        elif ((action == 'Direita') and (agent.location == loc_A)):
            agent.location = loc_B
            agent.performance -= 1
        elif ((action == 'Direita') and (agent.location == loc_C)):
            agent.location = loc_D
            agent.performance -= 1
        elif ((action == 'Cima') and (agent.location == loc_A)):
            agent.location = loc_C
            agent.performance -= 1
        elif ((action == 'Cima') and (agent.location == loc_B)):
            agent.location = loc_D
            agent.performance -= 1
        elif ((action == 'Baixo') and (agent.location == loc_C)):
            agent.location = loc_A
            agent.performance -= 1
        elif ((action == 'Baixo') and (agent.location == loc_D)):
            agent.location = loc_B
            agent.performance -= 1
            
        elif (action == 'GirarH'):
            if self.status[agent.location] == 'Cima':
                self.status[agent.location] = 'Cima'
            elif self.status[agent.location] == 'Direita':
                self.status[agent.location] = 'Baixo'
            elif self.status[agent.location] == 'Baixo':
                self.status[agent.location] = 'Esquerda'
            elif self.status[agent.location] == 'Esquerda':
                self.status[agent.location] = 'Cima'
        elif action == 'GirarAntiH':
            if self.status[agent.location] == 'Cima':
                self.status[agent.location] = 'Cima'
            elif self.status[agent.location] == 'Esquerda':
                self.status[agent.location] = 'Baixo'
            elif self.status[agent.location] == 'Baixo':
                self.status[agent.location] = 'Direita'
            elif self.status[agent.location] == 'Direita':
                self.status[agent.location] = 'Cima'

    def default_location(self, thing):
        return random.choice([loc_A, loc_B, loc_C, loc_D])
    
agente = AgenteAleatorioJogoPonteiros()
ambiente = AmbienteSimplesJogoPonteiros()
print("Iniciando Ambiente",ambiente.status)
ambiente.add_thing(agente)
for x in range(100):
    ambiente.step()
    print("Ambiente: ",ambiente.status)
        