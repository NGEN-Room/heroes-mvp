import random


STUN_EFFECT_TYPES = {"stun", "stunned"}
STUN_STATUS_NAMES = {"stun", "stunned"}

HELD_EFFECT_TYPES = {"held", "hold", "root", "rooted", "snare", "snared"}
HELD_STATUS_NAMES = {"held", "hold", "rooted", "root", "snared", "snare"}

DODGE_EFFECT_TYPES = {"dodge"}


def _normalized(value):
    return str(value or "").strip().lower()


def _number(value, default=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _clamp_percent(value):
    return max(0, min(100, int(value)))


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


def get_dodge_modifier(status):
    if _normalized(status.get("effectType")) not in DODGE_EFFECT_TYPES:
        return 0
    return _number(status.get("dodgeModifier"), 0)


def get_dodge_chance(character):
    total = sum(get_dodge_modifier(status) for status in character.get("status", []))
    return _clamp_percent(total)


def should_dodge(character):
    chance = get_dodge_chance(character)
    return chance > 0 and random.random() * 100 < chance


def apply_status(target, status, state):
    from backend.engine.combat import battle_log

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
    from backend.engine.combat import battle_log, deal_damage

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
