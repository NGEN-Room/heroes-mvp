from copy import deepcopy


def apply_modifiers(character):
    modified = deepcopy(character)
    age = character["age"]
    raw_stats = character["rawStats"]
    base_stats = character["baseStats"]

    brawn = raw_stats["brawn"]
    brain = raw_stats["brain"]
    speed = raw_stats["speed"]

    if age <= 20:
        brawn += 2
        brain -= 2
        speed += 1
    elif 41 <= age <= 60:
        brawn -= 2
        brain += 2
        speed -= 1
    elif age > 60:
        brawn -= 3
        brain += 3
        speed -= 2

    hp = base_stats["hp"]
    mp = base_stats["mp"]
    ap = base_stats["ap"]

    if character["class"]["className"] == "Warrior":
        hp += 30
        ap += 1

    modified["modifiedStats"] = {"brawn": brawn, "brain": brain, "speed": speed, "hp": hp, "mp": mp, "ap": ap}
    return modified
