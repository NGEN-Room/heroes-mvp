def arcane_slap(ctx, owner, target):
    damage = 5 + owner["modifiedStats"]["brain"]
    ctx.deal_damage(target, damage, "Arcane Slap")


ACTIONS = [
    {
        "id": "arcane-slap",
        "name": "Arcane Slap",
        "cost": 1,
        "speed": 3,
        "range": 1,
        "kind": "action",
        "effect": arcane_slap,
    }
]
