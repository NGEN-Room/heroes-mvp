def regenerate_resources(player):
    player["ap"] = min(player["ap"] + 1, player["modifiedStats"]["ap"])
    regen_amount = int(player["character"]["rawStats"]["brain"] * 0.2)
    player["mp"] = min(player["mp"] + regen_amount, player["modifiedStats"]["mp"])
