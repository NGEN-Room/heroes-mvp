# How To Add A Hero

This is the short version.

If you are a student making a hero, you usually only need to:

1. Make a new folder in `backend/heroes/`
2. Add `hero.py`
3. Add `actions.py`
4. Add `spells.py`
5. Put your stats in `hero.py`
6. Put your action code in `actions.py`
7. Put your spell code in `spells.py`

Example:

```text
backend/heroes/time_wizard/
  __init__.py
  hero.py
  actions.py
  spells.py
```

## Basic Example

### `hero.py`

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

### `actions.py`

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

### `spells.py`

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

## Two Valid Styles

You can write abilities in either style:

1. Direct style:

```python
def bonk(owner, target, state):
    target["hp"] -= 10
```

2. `ctx` style:

```python
def bonk(ctx, owner, target):
    ctx.deal_damage(target, 10, "Bonk")
```

Both are allowed.

## Read The Detailed Docs

For the deeper explanation, read:

- [docs/starters-guide-here-how-to-create-a-character.md](/Users/piha/development/heroes-mvp/docs/starters-guide-here-how-to-create-a-character.md)
- [docs/actions.md](/Users/piha/development/heroes-mvp/docs/actions.md)
- [docs/spells.md](/Users/piha/development/heroes-mvp/docs/spells.md)
- [docs/function-break-down.md](/Users/piha/development/heroes-mvp/docs/function-break-down.md)
- [docs/engine-expectations-and-outcomes.md](/Users/piha/development/heroes-mvp/docs/engine-expectations-and-outcomes.md)
- [docs/metadata-and-why.md](/Users/piha/development/heroes-mvp/docs/metadata-and-why.md)
- [docs/ctx-tool.md](/Users/piha/development/heroes-mvp/docs/ctx-tool.md)
