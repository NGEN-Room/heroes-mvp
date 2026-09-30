import random

def perform_lifesteal_attack(ctx, owner, target, base_damage, crit_chance, lifesteal_chance, lifesteal_ratio, attack_name):
    """
    Handles critical strikes, damage delivery, and lifesteal calculations.
    """
    damage = base_damage

    if random.random() < crit_chance:
        damage *= 2
        ctx.log(f"{owner['character']['name']} lands a CRITICAL STRIKE with {attack_name}!")

    result = ctx.deal_damage(target, damage, label=attack_name)
    actual_damage_dealt = result.get("hp", 0) + result.get("shield", 0)

    if actual_damage_dealt > 0 and random.random() < lifesteal_chance:
        heal_amount = max(1, int(actual_damage_dealt * lifesteal_ratio))
        ctx.heal(owner, heal_amount)
        ctx.log(f"{owner['character']['name']} drains blood and heals for {heal_amount} HP!")


def quick_attack_effect(ctx, owner, target):
    """
    Quick Slash: Charges forward to close distance, then attacks.
    High crit chance (30%), 25% chance to heal for 50% of damage dealt.
    """
    dist = ctx.distance(owner, target)
    if dist > 1:
        ctx.move_forward(owner, amount=dist - 1)

    perform_lifesteal_attack(
        ctx=ctx,
        owner=owner,
        target=target,
        base_damage=5,
        crit_chance=0.30,
        lifesteal_chance=0.25,
        lifesteal_ratio=0.50,
        attack_name="Quick Slash",
    )


def medium_attack_effect(ctx, owner, target):
    """
    Vampiric Strike: Medium damage melee attack.
    Medium crit chance (15%), 35% chance to heal for 50% of damage dealt.
    """
    perform_lifesteal_attack(
        ctx=ctx,
        owner=owner,
        target=target,
        base_damage=10,
        crit_chance=0.15,
        lifesteal_chance=0.35,
        lifesteal_ratio=0.50,
        attack_name="Vampiric Strike",
    )


def heavy_attack_effect(ctx, owner, target):
    """
    Executioner Swing: High damage melee attack with cooldown.
    Low crit chance (10%), high heal chance (50%) for 60% of damage dealt.
    """
    perform_lifesteal_attack(
        ctx=ctx,
        owner=owner,
        target=target,
        base_damage=18,
        crit_chance=0.10,
        lifesteal_chance=0.50,
        lifesteal_ratio=0.60,
        attack_name="Executioner Swing",
    )

ACTIONS = [
    {
        "id": "quick-slash",
        "name": "Quick Slash",
        "apCost": 1,
        "mpCost": 0,
        "speed": 4,
        "range": 3,  
        "kind": "action",
        "effect": quick_attack_effect,
    },
    {
        "id": "vampiric-strike",
        "name": "Vampiric Strike",
        "apCost": 2,
        "mpCost": 0,
        "speed": 2,
        "range": 1,
        "kind": "action",
        "effect": medium_attack_effect,
    },
    {
        "id": "executioner-swing",
        "name": "Executioner Swing",
        "apCost": 3,
        "mpCost": 0,
        "speed": 1,
        "range": 1,
        "cooldown": 2,
        "kind": "action",
        "effect": heavy_attack_effect,
    },
]
