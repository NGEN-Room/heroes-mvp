def baby_fireball(ctx, owner, target):
    damage = 10 + owner["modifiedStats"]["brain"]
    ctx.deal_damage(target, damage, "Baby Fireball")
    ctx.apply_status(target, "Burn", 3, can_stack=False, effect_type="burn_1", caster=owner)
    ctx.log(f"{owner['character']['name']} casts Baby Fiweball and looks shocked that it worked.")


def glowy_scales(ctx, owner, _target):
    shield = 10 + owner["modifiedStats"]["brain"] // 2
    ctx.add_shield(owner, shield, "Glowy Scales")
    ctx.apply_status(owner, "Focused", 2, can_stack=False, effect_type="focused_ap", caster=owner)
    ctx.log(f"{owner['character']['name']} polishes their scales until they glow with study magic.")


def sneezy_spark(ctx, owner, target):
    damage = 14 + owner["modifiedStats"]["brain"] // 2
    ctx.deal_damage(target, damage, "Sneezy Spark")
    ctx.apply_status(target, "Burn", 4, can_stack=False, effect_type="burn_1", caster=owner)
    ctx.move_backward(owner)
    ctx.log(f"{owner['character']['name']} sneezes a spark, then scoots back to pretend it was planned.")


def big_dwagon_dream(ctx, owner, target):
    burn_count = len([status for status in target["status"] if status["name"] == "Burn"])
    damage = 18 + owner["modifiedStats"]["brain"] + burn_count * 6
    ctx.deal_damage(target, damage, "Big Dwagon Dream")
    ctx.apply_status(target, "Burn", 5, can_stack=False, effect_type="burn_1", caster=owner)
    ctx.log(f"{owner['character']['name']} declares, 'One day I will be a weal fwaming dwagon!'")


SPELLS = [
    {
        "id": "baby-fireball",
        "name": "Baby Fiweball",
        "mpCost": 8,
        "speed": 3,
        "range": "ranged",
        "kind": "spell",
        "effect": baby_fireball,
    },
    {
        "id": "glowy-scales",
        "name": "Glowy Scales",
        "mpCost": 6,
        "speed": 4,
        "range": None,
        "kind": "spell",
        "effect": glowy_scales,
    },
    {
        "id": "sneezy-spark",
        "name": "Sneezy Spark",
        "mpCost": 10,
        "speed": 2,
        "range": 2,
        "kind": "spell",
        "effect": sneezy_spark,
    },
    {
        "id": "big-dwagon-dream",
        "name": "Big Dwagon Dream",
        "mpCost": 18,
        "speed": 1,
        "range": "global",
        "alignment": "brain",
        "kind": "spell",
        "effect": big_dwagon_dream,
    },
]
