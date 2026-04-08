def burning_hands(ctx, owner, target):
    ctx.deal_damage(target, 10, "Burning Hands")
    ctx.apply_status(target, "Burn", 5, can_stack=False, effect_type="burn_1", caster=owner)


ACTIONS = [
    {
        "id": "magic-burning-hands",
        "name": "Burning Hands",
        "mpCost": 5,
        "speed": 1,
        "range": 1,
        "kind": "action",
        "effect": burning_hands,
    }
]
