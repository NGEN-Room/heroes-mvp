import random


def killshot(ctx, _owner, target):
    if random.random() < 0.01:
        total = target["hp"] + target.get("shield", 0)
        ctx.deal_damage(target, total, "Killshot")


def multishot(ctx, _owner, target):
    ctx.deal_damage(target, 50, "Multishot")


def singleshot(ctx, _owner, target):
    ctx.deal_damage(target, 5, "Singleshot")


ACTIONS = [
    {
        "id": "killshot",
        "name": "Killshot",
        "apCost": 10,
        "mpCost": 10,
        "speed": 3,
        "alignment": "speed",
        "range": "global",
        "kind": "action",
        "effect": killshot,
    },
    {
        "id": "multishot",
        "name": "Multishot",
        "apCost": 10,
        "speed": 1,
        "range": "ranged",
        "kind": "action",
        "effect": multishot,
    },
    {
        "id": "singleshot",
        "name": "Singleshot",
        "apCost": 2,
        "range": "ranged",
        "kind": "action",
        "effect": singleshot,
    },
]
