from backend.engine.combat import battle_log, deal_damage


def apply_status(target, status, state):
    existing = next((entry for entry in target["status"] if entry["name"] == status["name"]), None)
    if status.get("canStack") or not existing:
        target["status"].append(status)
        battle_log(state, f"{target['character']['name']} is now {status['name']} for {status['turnsRemaining']} turns")


def establish_status(target, name, turns, can_stack, effect_type, caster, state):
    status = {
        "name": name,
        "turnsRemaining": turns,
        "canStack": bool(can_stack),
        "effectType": effect_type,
        "sourceName": caster["character"]["name"] if caster else None,
    }
    apply_status(target, status, state)


def resolve_statuses(character):
    state = character["state"]

    for status in character["status"]:
        effect_type = status.get("effectType")
        if effect_type == "bleed_1":
            deal_damage(character, 1, None, "Bleed")
        elif effect_type == "bleed_2":
            deal_damage(character, 2, None, "Bleed")
        elif effect_type == "burn_1":
            deal_damage(character, 1, None, "Burn")
        elif effect_type == "focused_ap":
            character["ap"] += 1
            battle_log(state, f"{character['character']['name']} gains 1 AP from Focused.")
        status["turnsRemaining"] -= 1

    character["status"] = [status for status in character["status"] if status["turnsRemaining"] > 0]
