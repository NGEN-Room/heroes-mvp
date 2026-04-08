def rally_cry(ctx, owner, _target):
    owner["ap"] += 1
    ctx.log(f"{owner['character']['name']} steels their resolve with Rally Cry.")


SPELLS = [
    {
        "id": "rally-cry",
        "name": "Rally Cry",
        "cost": 2,
        "mpCost": 5,
        "speed": 1,
        "kind": "spell",
        "effect": rally_cry,
    }
]
