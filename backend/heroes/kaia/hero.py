from backend.heroes.kaia.actions import ACTIONS
from backend.heroes.kaia.spells import SPELLS


HERO = {
    "id": "kaia",
    "name": "Kaia",
    "character": {
        "name": "Kaia the Bold",
        "age": 47,
        "class": {"className": "Mage"},
        "baseStats": {"hp": 90, "mp": 70, "ap": 3},
        "rawStats": {"brawn": 3, "brain": 8, "speed": 5},
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}
