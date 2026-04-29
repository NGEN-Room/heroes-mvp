import unittest

from backend.engine.context import AbilityContext
from backend.engine.match import MatchService
from backend.engine.positioning import move_forward


def make_player(name, hero_id="hero", position=0, status=None, queue=None, ap=1):
    return {
        "heroId": hero_id,
        "character": {
            "name": name,
            "rawStats": {"brain": 0},
        },
        "modifiedStats": {
            "hp": 20,
            "mp": 10,
            "ap": 3,
            "speed": 5,
        },
        "hp": 20,
        "mp": 10,
        "ap": ap,
        "position": position,
        "status": list(status or []),
        "shield": 0,
        "queue": list(queue or []),
    }


class DummyRegistry:
    def __init__(self, ability):
        self.ability = ability

    def get_ability(self, _hero_id, _ability_id):
        return self.ability


class ControlStatusTests(unittest.TestCase):
    def test_held_blocks_movement(self):
        actor = make_player(
            "A",
            status=[{"name": "Held", "turnsRemaining": 1, "effectType": "held"}],
        )
        opponent = make_player("B", hero_id="other", position=5)
        state = {"player1": actor, "player2": opponent, "logs": []}

        moved = move_forward(actor, state)

        self.assertFalse(moved)
        self.assertEqual(actor["position"], 0)
        self.assertEqual(state["logs"][-1], "A is held and cannot move forward.")

    def test_stunned_character_skips_queued_ability_without_spending_ap(self):
        def strike(ctx, _owner, target):
            ctx.deal_damage(target, 5, "Strike")

        ability = {
            "id": "strike",
            "name": "Strike",
            "kind": "action",
            "cost": 1,
            "speed": 0,
            "range": None,
            "effect": strike,
        }
        service = MatchService(DummyRegistry(ability))
        owner = make_player(
            "A",
            status=[{"name": "Stunned", "turnsRemaining": 2, "effectType": "stun"}],
            queue=["strike"],
            ap=1,
        )
        target = make_player("B", hero_id="other", position=5)
        state = {
            "id": "test-match",
            "player1": owner,
            "player2": target,
            "round": 1,
            "history": [],
            "logs": [],
            "flavour": [],
            "grid": {"min": 0, "max": 5},
        }

        service.run_round(state)

        self.assertEqual(target["hp"], 20)
        self.assertEqual(owner["ap"], 2)
        self.assertIn("A is stunned and cannot use Strike.", state["logs"])

    def test_context_helpers_apply_control_statuses(self):
        state = {"logs": []}
        caster = make_player("Caster")
        target = make_player("Target")
        ctx = AbilityContext(state)

        ctx.stun(target, 2, caster=caster)
        ctx.hold(target, 3, caster=caster)

        self.assertEqual(target["status"][0]["name"], "Stunned")
        self.assertEqual(target["status"][0]["effectType"], "stun")
        self.assertEqual(target["status"][0]["sourceName"], "Caster")
        self.assertEqual(target["status"][1]["name"], "Held")
        self.assertEqual(target["status"][1]["effectType"], "held")
        self.assertEqual(target["status"][1]["sourceName"], "Caster")


if __name__ == "__main__":
    unittest.main()
