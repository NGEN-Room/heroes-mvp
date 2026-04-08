from backend.heroes.thorn.actions import ACTIONS
from backend.heroes.thorn.spells import SPELLS


HERO = {
    "id": "thorn",
    "name": "Thorn",
    "character": {
        "name": "Thorn Ironfist",
        "age": 35,
        "class": {"className": "Warrior"},
        "baseStats": {"hp": 120, "mp": 20, "ap": 4},
        "rawStats": {"brawn": 8, "brain": 3, "speed": 4},
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}
