import unittest

from backend.engine.combat import deal_damage
from backend.engine.status import get_dodge_chance


def make_player(name="Target", status=None):
    return {
        "character": {"name": name},
        "modifiedStats": {
            "hp": 20,
            "mp": 10,
            "ap": 3,
            "speed": 5,
        },
        "hp": 20,
        "mp": 10,
        "ap": 3,
        "position": 0,
        "status": list(status or []),
        "shield": 0,
    }


class DodgeStatusTests(unittest.TestCase):
    def test_dodge_status_can_prevent_damage(self):
        target = make_player(
            status=[{"name": "Nimble", "turnsRemaining": 2, "effectType": "dodge", "dodgeModifier": 100}],
        )
        state = {"logs": []}

        result = deal_damage(target, 7, state, "Practice Hit")

        self.assertTrue(result["dodged"])
        self.assertEqual(target["hp"], 20)
        self.assertEqual(state["logs"], ["Target dodges Practice Hit."])

    def test_dodge_status_modifiers_stack_and_clamp(self):
        target = make_player(
            status=[
                {"name": "Nimble", "turnsRemaining": 2, "effectType": "dodge", "dodgeModifier": 80},
                {"name": "Slippery", "turnsRemaining": 2, "effectType": "dodge", "dodgeModifier": 40},
            ],
        )

        self.assertEqual(get_dodge_chance(target), 100)

    def test_negative_dodge_status_decreases_chance(self):
        target = make_player(
            status=[
                {"name": "Nimble", "turnsRemaining": 2, "effectType": "dodge", "dodgeModifier": 30},
                {"name": "Off Balance", "turnsRemaining": 2, "effectType": "dodge", "dodgeModifier": -10},
            ],
        )

        self.assertEqual(get_dodge_chance(target), 20)


if __name__ == "__main__":
    unittest.main()
