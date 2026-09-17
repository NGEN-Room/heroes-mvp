def fireball(ctx, owner, target):
    ctx.deal_damage(target, 10, "Fireball")


SPELLS = [
    {
        "id": "fireball",
        "name": "Fireball",
        "mpCost": 5,
        "speed": 1,
        "range": "ranged",
        "kind": "spell",
        "effect": fireball,
    }
]