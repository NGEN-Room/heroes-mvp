MAX_FOCUS = 3
FOCUS_TURNS = 3


def focus_stacks(owner):
    return len([status for status in owner["status"] if status["name"] == "Focused"])


def gain_focus(ctx, owner, amount=1):
    current = focus_stacks(owner)
    gained = min(amount, MAX_FOCUS - current)

    for _ in range(gained):
        ctx.apply_status(owner, "Focused", FOCUS_TURNS, can_stack=True, effect_type="focused_ap", caster=owner)

    if gained < amount:
        for status in owner["status"]:
            if status["name"] == "Focused":
                status["turnsRemaining"] = max(status["turnsRemaining"], FOCUS_TURNS)
        ctx.log(f"{owner['character']['name']} is already as focused as a tiny dwagon can be.")

    return gained


def spend_focus(owner, amount=None):
    available = focus_stacks(owner)
    spent = available if amount is None else min(amount, available)
    remaining_to_spend = spent
    kept_statuses = []

    for status in owner["status"]:
        if status["name"] == "Focused" and remaining_to_spend > 0:
            remaining_to_spend -= 1
            continue
        kept_statuses.append(status)

    owner["status"] = kept_statuses
    return spent


def baby_fireball(ctx, owner, target):
    focused = focus_stacks(owner)
    damage = 10 + owner["modifiedStats"]["brain"] + focused * 3
    ctx.deal_damage(target, damage, "Baby Fireball")
    ctx.apply_status(target, "Burn", 3, can_stack=False, effect_type="burn_1", caster=owner)
    ctx.log(f"{owner['character']['name']} casts Baby Fiweball with {focused} Focused stack(s).")


def glowy_scales(ctx, owner, _target):
    focused = focus_stacks(owner)
    shield = 8 + owner["modifiedStats"]["brain"] // 2 + focused * 2
    ctx.add_shield(owner, shield, "Glowy Scales")
    gain_focus(ctx, owner, 1)
    ctx.log(f"{owner['character']['name']} polishes their scales until they glow with study magic.")


def practice_puff(ctx, owner, target):
    focused = focus_stacks(owner)
    damage = 6 + owner["modifiedStats"]["brain"] // 2 + focused * 2
    ctx.deal_damage(target, damage, "Practice Puff")
    ctx.apply_status(target, "Burn", 2, can_stack=False, effect_type="burn_1", caster=owner)
    gained = gain_focus(ctx, owner, 1)
    ctx.log(f"{owner['character']['name']} practices a tiny puff and gains {gained} Focused stack(s).")


def study_spark(ctx, owner, _target):
    gained = gain_focus(ctx, owner, 2)
    ctx.add_shield(owner, 3 + gained * 2, "Study Spark")
    ctx.log(f"{owner['character']['name']} studies the spark very, very hard.")


def sneezy_spark(ctx, owner, target):
    spent = spend_focus(owner, 1)
    damage = 12 + owner["modifiedStats"]["brain"] // 2 + spent * 12
    ctx.deal_damage(target, damage, "Sneezy Spark")
    burn_turns = 3 + spent
    ctx.apply_status(target, "Burn", burn_turns, can_stack=False, effect_type="burn_1", caster=owner)
    ctx.move_backward(owner)
    ctx.log(f"{owner['character']['name']} spends {spent} Focused stack(s), sneezes a spark, then scoots back.")


def wittle_nova(ctx, owner, target):
    spent = spend_focus(owner, 2)
    damage = 10 + owner["modifiedStats"]["brain"] + spent * 10
    ctx.deal_damage(target, damage, "Wittle Nova")
    ctx.apply_status(target, "Burn", 2 + spent, can_stack=False, effect_type="burn_1", caster=owner)
    ctx.log(f"{owner['character']['name']} spends {spent} Focused stack(s) on a wittle nova.")


def big_dwagon_dream(ctx, owner, target):
    burn_count = len([status for status in target["status"] if status["name"] == "Burn"])
    spent = spend_focus(owner)
    damage = 18 + owner["modifiedStats"]["brain"] + burn_count * 6 + spent * 14
    ctx.deal_damage(target, damage, "Big Dwagon Dream")
    ctx.apply_status(target, "Burn", 5, can_stack=False, effect_type="burn_1", caster=owner)
    ctx.log(f"{owner['character']['name']} spends {spent} Focused stack(s) and declares, 'One day I will be a weal fwaming dwagon!'")


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
        "id": "practice-puff",
        "name": "Practice Puff",
        "mpCost": 7,
        "speed": 3,
        "range": "ranged",
        "kind": "spell",
        "effect": practice_puff,
    },
    {
        "id": "study-spark",
        "name": "Study Spark",
        "mpCost": 9,
        "speed": 5,
        "range": None,
        "kind": "spell",
        "effect": study_spark,
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
        "id": "wittle-nova",
        "name": "Wittle Nova",
        "mpCost": 14,
        "speed": 2,
        "range": 3,
        "kind": "spell",
        "effect": wittle_nova,
    },
    {
        "id": "big-dwagon-dream",
        "name": "Big Dwagon Dream",
        "mpCost": 22,
        "speed": 1,
        "range": "global",
        "kind": "spell",
        "effect": big_dwagon_dream,
    },
]
>>>>>>> main
