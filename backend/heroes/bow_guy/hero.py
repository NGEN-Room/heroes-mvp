from backend.heroes.bow_guy.actions import ACTIONS
from backend.heroes.bow_guy.spells import SPELLS


HERO = {
    "id": "bow-guy",
    "name": "BowGuy",
    "character": {
        "name": "Bow Guy",
        "age": 25,
        "class": {"className": "ranger", "arrows": 20, "notched": 0},
        "baseStats": {"hp": 60, "mp": 10, "ap": 100},
        "rawStats": {"brawn": 4, "brain": 10, "speed": 9},
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}
