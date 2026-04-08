from backend.heroes.bow_guy.actions import ACTIONS
from backend.heroes.bow_guy.spells import SPELLS


HERO = {
    "id": "bow-guy",
    "name": "BowGuy",
    "character": {
        "name": "Bow Guy",
        "age": 25,
        "class": {"className": "ranger", "arrows": 20, "notched": 0},
        "baseStats": {"hp": 100, "mp": 100, "ap": 100},
        "rawStats": {"brawn": 100, "brain": 100, "speed": 100},
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}
