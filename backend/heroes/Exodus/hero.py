from backend.heroes.Exodus.actions import ACTIONS
from backend.heroes.Exodus.spells import SPELLS


HERO = {
    "id": "Exodus",
    "name": "Exodus",
    "character": {
        "name": "Exodus",
        "age": 23,
        "class": {"className": "Mage"},
        "baseStats": {"hp": 120, "mp": 50, "ap": 5},
        "rawStats": {"brawn": 5, "brain": 12, "speed": 6},
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}