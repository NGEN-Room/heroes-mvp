from backend.heroes.blood_knight.actions import ACTIONS
from backend.heroes.blood_knight.spells import SPELLS

HERO = {
    "id": "blood-knight",
    "name": "Blood Knight",
    "character": {
        "name": "Blood Knight",
        "age": 32,
        "class": {"className": "Warrior"},
        "baseStats": {"hp": 50, "mp": 10, "ap": 3},
        "rawStats": {"brawn": 5, "brain": 2, "speed": 4},
        "traits": ["stagger_damage"],  
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}