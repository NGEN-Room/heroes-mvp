from backend.heroes.Exodus.actions import ACTIONS
from backend.heroes.Exodus.spells import SPELLS

Hero = {
    "id": "Exodus",
    "name":"Exodus",
    "character": {
        "name": "Exodus",
        "age": 23,
        "class": {"classname": "Mage"},
        "baseStats": {
            "hp": 50,
            "mp":100,
            "ap":5
        },
        "rawStats": {
            "brawn":5,
            "brain":12,
            "speed":6
        },
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}