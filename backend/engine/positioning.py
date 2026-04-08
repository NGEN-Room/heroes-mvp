from backend.engine.combat import battle_log


GRID_LIMITS = {"min": 0, "max": 5}


def clamp_position(value):
    return max(GRID_LIMITS["min"], min(GRID_LIMITS["max"], value))


def get_distance(entity_a, entity_b):
    pos_a = entity_a.get("position", GRID_LIMITS["min"])
    pos_b = entity_b.get("position", GRID_LIMITS["min"])
    return abs(pos_a - pos_b)


def move_by(actor, delta, state, intent):
    previous = actor.get("position", GRID_LIMITS["min"])
    nxt = clamp_position(previous + delta)

    if nxt == previous:
        battle_log(state, f"{actor['character']['name']} cannot move further {intent}.")
        return False

    actor["position"] = nxt
    battle_log(state, f"{actor['character']['name']} moves {intent} to position {nxt}.")
    return True


def move_forward(actor, state, amount=1):
    direction = 1 if actor is state["player1"] else -1
    return move_by(actor, direction * amount, state, "forward")


def move_backward(actor, state, amount=1):
    direction = -1 if actor is state["player1"] else 1
    return move_by(actor, direction * amount, state, "back")


def interpret_range_keyword(keyword):
    mapping = {
        "melee": 1,
        "adjacent": 1,
        "reach": 2,
        "ranged": 4,
        "global": float("inf"),
        "infinite": float("inf"),
    }
    return mapping.get(keyword)


def within_range(ability, owner, target):
    rng = ability.get("range")
    if rng is None:
        return True

    max_range = interpret_range_keyword(rng) if isinstance(rng, str) else rng
    min_range = ability.get("minRange", 0)
    if max_range is None:
        return True

    distance = get_distance(owner, target)
    return distance >= min_range and distance <= max_range
