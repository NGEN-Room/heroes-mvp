def firebolt(ctx, owner, target):
    damage = 15 + owner["modifiedStats"]["brain"] * 2
    ctx.deal_damage(target, damage, "Firebolt")


def burning_hands(ctx, owner, target):
    ctx.deal_damage(target, 5, "Burning Hands")
    ctx.apply_status(target, "Burn", 5, can_stack=False, effect_type="burn_1", caster=owner)


SPELLS = [
    {
        "id": "firebolt",
        "name": "Firebolt",
        "mpCost": 10,
        "speed": 2,
        "range": "ranged",
        "kind": "spell",
        "effect": firebolt,
    },
    {
        "id": "burning-hands",
        "name": "Burning Hands",
        "mpCost": 5,
        "speed": 1,
        "range": 1,
        "alignment": "brain",
        "kind": "spell",
        "effect": burning_hands,
    },
]
