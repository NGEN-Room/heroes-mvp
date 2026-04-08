from backend.heroes.gladius.actions import ACTIONS
from backend.heroes.gladius.spells import SPELLS


HERO = {
    "id": "gladius",
    "name": "Gladius",
    "character": {
        "name": "Gladius",
        "age": 23,
        "class": {"className": "Bloodhound"},
        "baseStats": {"hp": 100, "mp": 50, "ap": 6},
        "rawStats": {"brawn": 5, "brain": 3, "speed": 8},
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}
