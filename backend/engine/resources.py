def regenerate_resources(player):
    # AP is a per-round choice budget, not a resource players need to wait for.
    player["ap"] = player["modifiedStats"]["ap"]
    # Every hero gets at least a little MP back, even if their Brain is low.
    regen_amount = max(1, int(player["character"]["rawStats"]["brain"] * 0.2))
    player["mp"] = min(player["mp"] + regen_amount, player["modifiedStats"]["mp"])
