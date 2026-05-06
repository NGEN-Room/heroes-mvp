from backend.engine.combat import add_shield, battle_log, deal_damage, heal_character
from backend.engine.positioning import get_distance, move_backward, move_forward
from backend.engine.status import establish_status


class AbilityContext:
    def __init__(self, state):
        self.state = state

    def log(self, message):
        battle_log(self.state, message)

    def deal_damage(self, target, amount, label=None, can_dodge=True):
        return deal_damage(target, amount, self.state, label, can_dodge=can_dodge)

    def heal(self, target, amount):
        return heal_character(target, amount)

    def add_shield(self, target, amount, label=None):
        return add_shield(target, amount, self.state, label)

    def apply_status(self, target, name, turns, can_stack=False, effect_type=None, caster=None, dodge_modifier=None):
        establish_status(target, name, turns, can_stack, effect_type, caster, self.state, dodge_modifier=dodge_modifier)

    def stun(self, target, turns=1, caster=None):
        establish_status(target, "Stunned", turns, False, "stun", caster, self.state)

    def hold(self, target, turns=1, caster=None):
        establish_status(target, "Held", turns, False, "held", caster, self.state)

    def move_forward(self, actor, amount=1):
        return move_forward(actor, self.state, amount)

    def move_backward(self, actor, amount=1):
        return move_backward(actor, self.state, amount)

    def distance(self, actor, target):
        return get_distance(actor, target)
