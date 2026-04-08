def gutter_pig(ctx, owner, target):
    ctx.deal_damage(target, 10, "Gutter Pig")
    ctx.apply_status(target, "Bleed", 5, can_stack=True, effect_type="bleed_1", caster=owner)


def double_slash(ctx, owner, target):
    ctx.deal_damage(target, 5, "Double Slash")
    ctx.apply_status(target, "Bleed", 5, can_stack=True, effect_type="bleed_1", caster=owner)


ACTIONS = [
    {
        "id": "gutter-pig",
        "name": "Gutter Pig",
        "cost": 3,
        "speed": 3,
        "alignment": "speed",
        "range": 1,
        "kind": "action",
        "effect": gutter_pig,
    },
    {
        "id": "double-slash",
        "name": "Double Slash",
        "cost": 2,
        "speed": 4,
        "alignment": "speed",
        "range": 1,
        "kind": "action",
        "effect": double_slash,
    },
]
