def deflection(ctx, owner, target):
    damage = 10 + owner["modifiedStats"["brain"]]
    ctx.deal.damage(target, damage, "Deflection") 


SPELLS = [
{
        "id": "deflection",
        "name": "Deflection",
        "mpcost":10,
        "speed":3,
        "range":3,
        "kind": "spell",
        "effect": deflection,
    },
]