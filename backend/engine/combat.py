def battle_log(state, message):
    state.setdefault("logs", []).append(message)


def deal_damage(target, amount, state=None, label=None):
    if amount <= 0:
        return {"total": 0, "hp": 0, "shield": 0}

    remaining = max(0, amount)
    target.setdefault("shield", 0)

    initial_shield = target["shield"]
    shield_absorbed = min(initial_shield, remaining)
    target["shield"] -= shield_absorbed
    remaining -= shield_absorbed

    initial_hp = target.get("hp", 0)
    new_hp = max(initial_hp - remaining, 0)
    hp_lost = initial_hp - new_hp
    target["hp"] = new_hp

    if state and shield_absorbed > 0:
        target_name = target["character"]["name"]
        suffix = f" from {label}" if label else ""
        battle_log(state, f"{target_name}'s shield absorbs {shield_absorbed} dmg{suffix}.")

    return {"total": amount, "hp": hp_lost, "shield": shield_absorbed}


def heal_character(target, amount):
    if amount <= 0:
        return {"healed": 0, "overflow": 0}

    max_hp = target["modifiedStats"]["hp"]
    missing = max(0, max_hp - target["hp"])
    healed = min(missing, amount)
    target["hp"] = min(target["hp"] + healed, max_hp)
    return {"healed": healed, "overflow": amount - healed}


def add_shield(target, amount, state=None, label=None):
    if amount <= 0:
        return target.get("shield", 0)

    target.setdefault("shield", 0)
    target["shield"] += amount

    if state:
        suffix = f" from {label}" if label else ""
        battle_log(state, f"{target['character']['name']} gains a shield of {amount}{suffix}.")

    return target["shield"]
