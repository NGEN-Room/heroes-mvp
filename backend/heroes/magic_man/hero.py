from backend.heroes.magic_man.actions import ACTIONS
from backend.heroes.magic_man.spells import SPELLS


HERO = {
    "id": "magic-man",
    "name": "MagicMan",
    "character": {
        "name": "magicMan",
        "age": 25,
        "class": {"className": "Mage"},
        "baseStats": {"hp": 10, "mp": 20, "ap": 0},
        "rawStats": {"brawn": 2, "brain": 4, "speed": 3},
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}
