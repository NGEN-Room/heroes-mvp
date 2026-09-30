def meteor_strike(ctx, owner, target):
    damage = 10 + owner["modifiedStats"]["brawn"]
    ctx.deal_damage(target, damage, "Meteor Strike")


def ice_shards(ctx, owner, target):
    damage = 8 + owner["modifiedStats"]["speed"]
    ctx.deal_damage(target, damage, "Ice Shards")


ACTIONS = [
    {
        "id": "meteor-strike",
        "name": "Meteor Strike",
        "cost":2,
        "speed":2,
        "range":5,
        "kind": "action",
        "effect": meteor_strike,
    },
    {
        "id": "ice shards",
        "name": "Ice Shards",
        "cost":3,
        "speed":3,
        "range":5,
        "kind": "action",
        "effect": ice_shards,
    },
]