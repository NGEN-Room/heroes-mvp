import unittest

from backend.engine.match import MatchService


def player(name, hero_id, ap=0, cooldowns=None):
    return {
        "heroId": hero_id,
        "character": {"name": name, "rawStats": {"brain": 0}},
        "modifiedStats": {"hp": 20, "mp": 10, "ap": 3, "speed": 0},
        "hp": 20,
        "mp": 10,
        "ap": ap,
        "position": 0,
        "status": [],
        "shield": 0,
        "queue": [],
        "cooldowns": dict(cooldowns or {}),
    }


class Registry:
    def __init__(self, ability):
        self.ability = ability

    def get_ability(self, _hero_id, _ability_id):
        return self.ability


class TurnRuleTests(unittest.TestCase):
    def test_ap_refills_after_a_round(self):
        service = MatchService(Registry({"id": "wait", "name": "Wait", "effect": None, "range": None}))
        first, second = player("First", "first"), player("Second", "second")
        state = {"player1": first, "player2": second, "logs": [], "history": [], "round": 1}

        service.run_round(state)

        self.assertEqual(first["ap"], 3)
        self.assertEqual(second["ap"], 3)

    def test_cooldown_blocks_two_future_rounds(self):
        ability = {"id": "blast", "name": "Blast", "effect": None, "range": None, "cooldown": 2}
        service = MatchService(Registry(ability))
        first, second = player("First", "first", ap=3), player("Second", "second")
        first["queue"] = ["blast"]
        state = {"player1": first, "player2": second, "logs": [], "history": [], "round": 1}

        service.run_round(state)
        self.assertEqual(first["cooldowns"]["blast"], 2)

        first["queue"] = ["blast"]
        service.run_round(state)
        self.assertEqual(first["cooldowns"]["blast"], 1)

        first["queue"] = ["blast"]
        service.run_round(state)
        self.assertNotIn("blast", first["cooldowns"])


if __name__ == "__main__":
    unittest.main()
