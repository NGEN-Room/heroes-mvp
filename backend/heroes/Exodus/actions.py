def Slash(ctx, owner, target):
    damage = 5 + owner["modifiedStats"]["brawn"]
    ctx.deal_damage(target, damage, "Slash")


ACTIONS = [
    {
        "id": "Slash",
        "name": "Slash",
        "cost":2,
        "speed":2,
        "range":5,
        "kind": "action",
        "effect": Slash,
    },
]