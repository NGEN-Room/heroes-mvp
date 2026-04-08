def stab(ctx, owner, target):
    damage = 10 + owner["modifiedStats"]["brawn"]
    ctx.deal_damage(target, damage, "Stab")


ACTIONS = [
    {
        "id": "stab",
        "name": "Stab",
        "cost": 1,
        "speed": 3,
        "range": 1,
        "kind": "action",
        "effect": stab,
    }
]
