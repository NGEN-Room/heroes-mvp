from backend.heroes.archie.actions import ACTIONS
from backend.heroes.archie.spells import SPELLS


HERO = {
    "id": "archie",
    "name": "Archie Mag",
    "character": {
        "name": "Archie Mag",
        "age": 23,
        "class": {"className": "Archmage"},
        "baseStats": {"hp": 60, "mp": 120, "ap": 40},
        "rawStats": {"brawn": 2, "brain": 8, "speed": 6},
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}
