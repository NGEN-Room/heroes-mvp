from copy import deepcopy

from backend.engine.dodge import status_dodge_modifier


def public_ability(ability):
    visible = deepcopy(ability)
    visible.pop("effect", None)
    return visible


def public_statuses(statuses):
    grouped = {}

    for status in statuses:
        name = status["name"]
        if name not in grouped:
            grouped[name] = {"name": name, "turnsRemaining": status["turnsRemaining"], "stacks": 0}

        grouped[name]["stacks"] += 1
        grouped[name]["turnsRemaining"] = max(grouped[name]["turnsRemaining"], status["turnsRemaining"])
        dodge_modifier = status_dodge_modifier(status)
        if dodge_modifier:
            grouped[name]["dodgeModifier"] = grouped[name].get("dodgeModifier", 0) + dodge_modifier

    return list(grouped.values())


def serialize_player(player, hero_definition):
    return {
        "heroId": player["heroId"],
        "character": {
            "name": player["character"]["name"],
            "className": player["character"]["class"]["className"],
        },
        "modifiedStats": deepcopy(player["modifiedStats"]),
        "hp": player["hp"],
        "mp": player["mp"],
        "ap": player["ap"],
        "position": player["position"],
        "shield": player.get("shield", 0),
        "status": public_statuses(player["status"]),
        "queue": list(player["queue"]),
        "availableActions": [public_ability(ability) for ability in hero_definition["actions"]],
        "availableSpells": [public_ability(ability) for ability in hero_definition["spells"]],
    }


def serialize_match(state, hero_lookup, winner):
    return {
        "matchId": state["id"],
        "round": state["round"],
        "winner": winner,
        "grid": deepcopy(state["grid"]),
        "logs": list(state["logs"]),
        "flavour": list(state["flavour"]),
        "player1": serialize_player(state["player1"], hero_lookup[state["player1"]["heroId"]]),
        "player2": serialize_player(state["player2"], hero_lookup[state["player2"]["heroId"]]),
    }
