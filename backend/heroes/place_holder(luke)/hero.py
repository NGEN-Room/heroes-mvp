from backend.heroes.magic_man.actions import ACTIONS
from backend.heroes.magic_man.spells import SPELLS


HERO = {
    "id": "time-wizard",
    "name": "Time Wizard",
    "character": {
        "name": "Time Wizard",
        "age": 72,
        "class": {"className": "Mage"},
        "baseStats": {"hp": 80, "mp": 90, "ap": 3},
        "rawStats": {"brawn": 2, "brain": 9, "speed": 4},
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}