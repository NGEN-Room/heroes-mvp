from backend.engine.context import AbilityContext


def advance_effect(ctx: AbilityContext, owner, _target):
    ctx.move_forward(owner)


def retreat_effect(ctx: AbilityContext, owner, _target):
    ctx.move_backward(owner)


CORE_ACTIONS = [
    {
        "id": "advance",
        "name": "Advance",
        "cost": 1,
        "speed": 5,
        "range": None,
        "kind": "action",
        "effect": advance_effect,
    },
    {
        "id": "retreat",
        "name": "Retreat",
        "cost": 1,
        "speed": 5,
        "range": None,
        "kind": "action",
        "effect": retreat_effect,
    },
]
