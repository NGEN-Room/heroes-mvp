def arcane_art(ctx, owner, target):
    damage = 9 + owner["modifiedStats"]["brain"]
    ctx.deal_damage(target, damage, "Arcane Art")
    ctx.log(f"{target['character']['name']} is drawn anew, by Archie's arcane art!")

def wrath_of_gods(ctx, owner, target):
    damage = 100 + owner["modifiedStats"]["brain"]
    ctx.deal_damage(target, damage, "Wrath of Gods")
    ctx.log(f"{target['character']['name']} is struck down by the wrath of the gods! prayed to by Archie!")

ACTIONS = [
    {
        "id": "arcane-art",
        "name": "Arcane Art",
        "cost": 1,
        "speed": 3,
        "range": 1,
        "kind": "action",
        "effect": arcane_art,
    },
    {
        "id": "wrath-of-gods",
        "name": "Wrath of Gods",
        "cost": 0,
        "speed": 10,
        "range": 10,
        "kind": "action",
        "effect": wrath_of_gods,
    }
]
