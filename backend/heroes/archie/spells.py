def fireball(ctx, _owner, target):
    ctx.deal_damage(target, 10, "Fireball")
    ctx.log(f"{target['character']['name']} is blasted by a powerful ball of flame! 'FIREBALL!!' ")

def steal_lifeforce(ctx, _owner, target):
    ctx.deal_damage(target, 10, "Steal Lifeforce")
    ctx.log(f"{target['character']['name']} has their lifeforce stolen by Archie!")

SPELLS = [
    {
        "id": "fireball",
        "name": "Fireball",
        "mpCost": 6,
        "speed": 1,
        "alignment": "brain",
        "range": 10,
        "kind": "spell",
        "effect": fireball,
    },
    {
        "id": "steal-lifeforce",
        "name": "Steal Lifeforce",
        "mpCost": 10,
        "speed": 1,
        "alignment": "brain",
        "range": 1,
        "kind": "spell",
        "effect": steal_lifeforce,
    }
]
