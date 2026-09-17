from backend.heroes.time_wizard.actions import ACTIONS
from backend.heroes.time_wizard.spells import SPELLS


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