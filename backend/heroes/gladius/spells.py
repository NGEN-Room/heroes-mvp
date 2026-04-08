def blood_leech(ctx, owner, target):
    ctx.deal_damage(target, 8, "Blood Leech")
    bleed_count = len([status for status in target["status"] if status["name"] == "Bleed"])
    heal_amount = bleed_count * 2
    result = ctx.heal(owner, heal_amount)

    if result["overflow"] > 0:
        ctx.add_shield(owner, result["overflow"], "Blood Leech")

    details = []
    if result["healed"] > 0:
        details.append(f"restores {result['healed']} HP")
    if result["overflow"] > 0:
        details.append(f"gains {result['overflow']} shield")
    suffix = f" ({', '.join(details)})" if details else ""
    ctx.log(f"{owner['character']['name']} leeches {heal_amount} vitality from {target['character']['name']}{suffix}.")


def blood_tracker(ctx, owner, target):
    is_bleeding = any(status["name"] == "Bleed" for status in target["status"])
    if is_bleeding:
        ctx.apply_status(owner, "Focused", 3, can_stack=False, effect_type="focused_ap", caster=owner)
    else:
        ctx.log(f"{owner['character']['name']} found no bleeding to track.")


def final_bleed(ctx, owner, target):
    is_bleeding = any(status["name"] == "Bleed" for status in target["status"])
    if is_bleeding:
        ctx.deal_damage(target, 12, "Final Bleed")
        ctx.apply_status(target, "Bleed", 3, can_stack=True, effect_type="bleed_2", caster=owner)
    else:
        ctx.log(f"{owner['character']['name']} tried to finish the wound, but the target wasn't bleeding.")


SPELLS = [
    {
        "id": "blood-leech",
        "name": "Blood Leech",
        "mpCost": 10,
        "speed": 2,
        "alignment": "brain",
        "range": 2,
        "kind": "spell",
        "effect": blood_leech,
    },
    {
        "id": "blood-tracker",
        "name": "Blood Tracker",
        "mpCost": 5,
        "speed": 3,
        "range": 2,
        "kind": "spell",
        "effect": blood_tracker,
    },
    {
        "id": "final-bleed",
        "name": "Final Bleed",
        "mpCost": 7,
        "speed": 1,
        "alignment": "speed",
        "range": 1,
        "kind": "spell",
        "effect": final_bleed,
    },
]
