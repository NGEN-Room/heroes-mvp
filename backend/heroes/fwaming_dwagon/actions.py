def tiny_chomp(ctx, owner, target):
    damage = 7 + owner["modifiedStats"]["brawn"]
    ctx.deal_damage(target, damage, "Tiny Chomp")

    if any(status["name"] == "Burn" for status in target["status"]):
        ctx.add_shield(owner, 3, "tiny brave dragon confidence")
        ctx.log(f"{owner['character']['name']} does a proud tiny chomp because the target is alweady spicy.")


def wing_wiggle(ctx, owner, _target):
    moved = ctx.move_forward(owner)
    ctx.add_shield(owner, 4, "Wing Wiggle")

    if moved:
        ctx.log(f"{owner['character']['name']} wiggles closer and insists those are real dwagon wings.")


def pocket_ash(ctx, owner, target):
    damage = 4 + owner["modifiedStats"]["speed"]
    ctx.deal_damage(target, damage, "Pocket Ash")
    ctx.apply_status(target, "Burn", 2, can_stack=False, effect_type="burn_1", caster=owner)
    ctx.log(f"{owner['character']['name']} tosses pocket ash and says it was absolutely a spell.")


ACTIONS = [
    {
        "id": "tiny-chomp",
        "name": "Tiny Chomp",
        "cost": 1,
        "speed": 3,
        "range": 1,
        "kind": "action",
        "effect": tiny_chomp,
    },
    {
        "id": "wing-wiggle",
        "name": "Wing Wiggle",
        "cost": 1,
        "speed": 5,
        "range": None,
        "kind": "action",
        "effect": wing_wiggle,
    },
    {
        "id": "pocket-ash",
        "name": "Pocket Ash",
        "cost": 2,
        "speed": 4,
        "range": 2,
        "kind": "action",
        "effect": pocket_ash,
    },
]
