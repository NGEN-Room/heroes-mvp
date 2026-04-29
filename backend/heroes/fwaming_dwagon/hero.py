from backend.heroes.magic_man.actions import ACTIONS
from backend.heroes.magic_man.spells import SPELLS

HERO = {
    "id": "fwaming_dwagon",
    "Name": "Fwaming Dragon",
    "charcater": {
        "name": "Fwaming Dragon",
        "age": 32,
        "class": {"className": "Pyromaniac"},
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
    "actions": ACTIONS,
    "spells": SPELLS,
    }
}