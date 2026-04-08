# How To Create A Character

Create a new folder in `backend/heroes/`.

Example:

```text
backend/heroes/time_wizard/
  __init__.py
  hero.py
  actions.py
  spells.py
```

## What Each File Does

- `hero.py`: hero name, stats, and imports
- `actions.py`: actions and their effect functions
- `spells.py`: spells and their effect functions

## `hero.py` Example

```python
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
```

## `actions.py` Example

```python
def bonk(owner, target, state):
    target["hp"] -= 5


ACTIONS = [
    {
        "id": "bonk",
        "name": "Bonk",
        "cost": 1,
        "speed": 2,
        "range": 1,
        "kind": "action",
        "effect": bonk,
    }
]
```

## `spells.py` Example

```python
def rewind(ctx, owner, target):
    owner["hp"] += 5
    ctx.log(f"{owner['character']['name']} rewinds their wounds.")


SPELLS = [
    {
        "id": "rewind",
        "name": "Rewind",
        "mpCost": 4,
        "speed": 1,
        "range": "global",
        "kind": "spell",
        "effect": rewind,
    }
]
```

## Important Notes

- `HERO` must exist in `hero.py`
- each action/spell needs an `id`, `name`, and `effect`
- the folder name should be lowercase with underscores
- the engine will auto-load hero folders
