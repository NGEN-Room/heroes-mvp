from backend.heroes.fwaming_dwagon.actions import ACTIONS
from backend.heroes.fwaming_dwagon.spells import SPELLS


HERO = {
    "id": "fwaming_dwagon",
    "name": "Fwaming Dwagon",
    "character": {
        "name": "Fwaming Dwagon",
        "age": 32,
        "class": {"className": "Aspiring Fwame Mage"},
        "baseStats": {
            "hp": 75,
            "mp": 100,
            "ap": 5
        },
        "rawStats": {
            "brawn": 5,
            "brain": 14,
            "speed": 5
        },
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}
