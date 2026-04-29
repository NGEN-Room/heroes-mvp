# Starters Guide Here: How To Create A Character

This is the first doc students should read.

## Folder Structure

Make a new folder in `backend/heroes/`.

Example:

```text
backend/heroes/ice_guard/
  __init__.py
  hero.py
  actions.py
  spells.py
```

## What Goes In Each File

- `hero.py`: hero name and stats
- `actions.py`: normal actions
- `spells.py`: magic and special abilities

## Your Hero File

```python
from backend.heroes.ice_guard.actions import ACTIONS
from backend.heroes.ice_guard.spells import SPELLS


HERO = {
    "id": "ice-guard",
    "name": "Ice Guard",
    "character": {
        "name": "Ice Guard",
        "age": 31,
        "class": {"className": "Warrior"},
        "baseStats": {"hp": 110, "mp": 30, "ap": 4},
        "rawStats": {"brawn": 7, "brain": 4, "speed": 5},
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}
```

## Your First Action

```python
def bonk(owner, target, state):
    target["hp"] -= 10


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

## Your First Spell

```python
def fireball(ctx, owner, target):
    ctx.deal_damage(target, 10, "Fireball")


SPELLS = [
    {
        "id": "fireball",
        "name": "Fireball",
        "mpCost": 5,
        "speed": 1,
        "range": "ranged",
        "kind": "spell",
        "effect": fireball,
    }
]
```

## Important

You can use:

- direct state style
- `ctx` style

Both are supported.

If you want to understand why the engine needs metadata or why functions use `owner`, `target`, and `state`, read the other docs in this folder.
