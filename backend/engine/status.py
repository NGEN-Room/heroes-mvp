from backend.engine.combat import battle_log, deal_damage


STUN_EFFECT_TYPES = {"stun", "stunned"}
STUN_STATUS_NAMES = {"stun", "stunned"}

HELD_EFFECT_TYPES = {"held", "hold", "root", "rooted", "snare", "snared"}
HELD_STATUS_NAMES = {"held", "hold", "rooted", "root", "snared", "snare"}


def _normalized(value):
    return str(value or "").strip().lower()


def has_status_rule(character, effect_types=None, names=None):
    effect_types = {_normalized(effect_type) for effect_type in effect_types or []}
    names = {_normalized(name) for name in names or []}

    for status in character.get("status", []):
        effect_type = _normalized(status.get("effectType"))
        name = _normalized(status.get("name"))

        if effect_type and effect_type in effect_types:
            return True
        if name and name in names:
            return True

    return False


def is_stunned(character):
    return has_status_rule(character, effect_types=STUN_EFFECT_TYPES, names=STUN_STATUS_NAMES)


def is_held(character):
    return has_status_rule(character, effect_types=HELD_EFFECT_TYPES, names=HELD_STATUS_NAMES)


def apply_status(target, status, state):
    existing = next((entry for entry in target["status"] if entry["name"] == status["name"]), None)
    if status.get("canStack") or not existing:
        target["status"].append(status)
        battle_log(state, f"{target['character']['name']} is now {status['name']} for {status['turnsRemaining']} turns")


def establish_status(target, name, turns, can_stack, effect_type, caster, state, dodge_modifier=None):
    status = {
        "name": name,
        "turnsRemaining": turns,
        "canStack": bool(can_stack),
        "effectType": effect_type,
        "sourceName": caster["character"]["name"] if caster else None,
    }
    if dodge_modifier is not None:
        status["dodgeModifier"] = dodge_modifier
    apply_status(target, status, state)


def resolve_statuses(character):
    state = character["state"]

    for status in character["status"]:
        effect_type = status.get("effectType")
        if effect_type == "bleed_1":
            deal_damage(character, 1, None, "Bleed", can_dodge=False)
        elif effect_type == "bleed_2":
            deal_damage(character, 2, None, "Bleed", can_dodge=False)
        elif effect_type == "burn_1":
            deal_damage(character, 1, None, "Burn", can_dodge=False)
        elif effect_type == "focused_ap":
            character["ap"] += 1
            battle_log(state, f"{character['character']['name']} gains 1 AP from Focused.")
        status["turnsRemaining"] -= 1

    character["status"] = [status for status in character["status"] if status["turnsRemaining"] > 0]
