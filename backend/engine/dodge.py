import random


DODGE_EFFECT_TYPES = {"dodge", "dodge_modifier", "dodge_up", "dodge_down"}


def _normalized(value):
    return str(value or "").strip().lower()


def _number(value, default=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _clamp_chance(value):
    return max(0, min(100, int(value)))


def status_dodge_modifier(status):
    effect_type = _normalized(status.get("effectType"))
    if effect_type not in DODGE_EFFECT_TYPES:
        return 0

    if effect_type == "dodge_down":
        modifier = _number(status.get("dodgeModifier", status.get("value")), 10)
        return -abs(modifier)

    return _number(status.get("dodgeModifier", status.get("value")), 0)


def get_dodge_chance(character):
    status_dodge = sum(status_dodge_modifier(status) for status in character.get("status", []))
    return _clamp_chance(status_dodge)


def should_dodge(character):
    chance = get_dodge_chance(character)
    return chance > 0 and random.random() * 100 < chance
