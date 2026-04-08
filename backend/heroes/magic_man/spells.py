def fireball(ctx, _owner, target):
    ctx.deal_damage(target, 10, "Fireball")


SPELLS = [
    {
        "id": "fireball",
        "name": "Fireball",
        "mpCost": 5,
        "speed": 1,
        "alignment": "brain",
        "range": "ranged",
        "kind": "spell",
        "effect": fireball,
    }
]
