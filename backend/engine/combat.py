from backend.engine.status import should_dodge


def battle_log(state, message):
    state.setdefault("logs", []).append(message)


def deal_damage(target, amount, state=None, label=None, can_dodge=True):
    if amount <= 0:
        return {"total": 0, "hp": 0, "shield": 0, "dodged": False}

    if can_dodge and should_dodge(target):
        if state:
            target_name = target["character"]["name"]
            suffix = label if label else "the attack"
            battle_log(state, f"{target_name} dodges {suffix}.")
        return {"total": amount, "hp": 0, "shield": 0, "dodged": True}

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

    return {"total": amount, "hp": hp_lost, "shield": shield_absorbed, "dodged": False}


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

def take_staggered_damage(target, amount, state=None, label=None, can_dodge=True):
    """
    Applies 70% of incoming damage immediately and staggers 30% into a pool
    that ticks down over 3 turns.
    """
    stagger_ratio = 0.30
    staggered_amount = int(amount * stagger_ratio)
    immediate_amount = amount - staggered_amount

    target["_bypassing_stagger"] = True
    result = deal_damage(target, immediate_amount, state=state, label=label, can_dodge=can_dodge)
    target.pop("_bypassing_stagger", None)

    if result.get("dodged") or amount <= 0:
        return result

    target.setdefault("staggered_damage_pool", 0)
    target["staggered_damage_pool"] += staggered_amount
    target["stagger_turns_left"] = 3

    if state and staggered_amount > 0:
        target_name = target["character"]["name"]
        battle_log(state, f"{target_name} staggers {staggered_amount} damage over 3 turns!")

    return result


def deal_damage(target, amount, state=None, label=None, can_dodge=True):
    if "stagger_damage" in target.get("character", {}).get("traits", []) and not target.get("_bypassing_stagger"):
        return take_staggered_damage(target, amount, state, label, can_dodge)

    if amount <= 0:
        return {"total": 0, "hp": 0, "shield": 0, "dodged": False}

    if can_dodge and should_dodge(target):
        if state:
            target_name = target["character"]["name"]
            suffix = label if label else "the attack"
            battle_log(state, f"{target_name} dodges {suffix}.")
        return {"total": amount, "hp": 0, "shield": 0, "dodged": True}

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

    return {"total": amount, "hp": hp_lost, "shield": shield_absorbed, "dodged": False}