# How To Build A New Hero

This guide is for students adding a new hero to the Python backend.

You do **not** need to edit the main server.
You do **not** need to edit the game engine unless your hero needs a brand new system.

Most of the time, you only need to create a new folder in `backend/heroes/` and add your hero files there.

## The Big Idea

Each hero lives in its own folder.

Example:

```text
backend/heroes/fire_knight/
  hero.py
  actions.py
  spells.py
```

Your hero folder contains:

- `hero.py`: the hero's name, stats, and imports
- `actions.py`: normal attacks or physical abilities
- `spells.py`: magical abilities or special powers

The backend loader automatically finds hero folders, so if your files are structured correctly, your hero will appear in the game.

## Step 1: Create A Hero Folder

Pick a folder name using lowercase and underscores.

Example:

```text
backend/heroes/time_wizard/
```

Then add these files:

```text
backend/heroes/time_wizard/__init__.py
backend/heroes/time_wizard/hero.py
backend/heroes/time_wizard/actions.py
backend/heroes/time_wizard/spells.py
```

Your `__init__.py` file can stay empty.

## Step 2: Build `actions.py`

Actions are usually basic attacks, weapon moves, movement tricks, or non-magical abilities.

Example:

```python
def bonk(ctx, owner, target):
    damage = 8 + owner["modifiedStats"]["brawn"]
    ctx.deal_damage(target, damage, "Bonk")


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

This file has two parts:

1. A Python function that does the actual effect
2. An `ACTIONS` list that describes the action to the game

## Step 3: Build `spells.py`

Spells work the same way, but are usually magical or unusual powers.

Example:

```python
def fire_burst(ctx, owner, target):
    damage = 12 + owner["modifiedStats"]["brain"]
    ctx.deal_damage(target, damage, "Fire Burst")
    ctx.apply_status(target, "Burn", 3, can_stack=False, effect_type="burn_1", caster=owner)


SPELLS = [
    {
        "id": "fire-burst",
        "name": "Fire Burst",
        "mpCost": 5,
        "speed": 2,
        "range": "ranged",
        "kind": "spell",
        "effect": fire_burst,
    }
]
```

## Step 4: Build `hero.py`

This file combines your stats, actions, and spells into one hero.

Example:

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

The `HERO` variable must exist, because the loader looks for it.

## What `ctx`, `owner`, and `target` Mean

When your ability function runs, it receives:

- `ctx`: a helper object with engine tools
- `owner`: the character using the ability
- `target`: the opponent being targeted

Example:

```python
def slash(ctx, owner, target):
    ctx.deal_damage(target, 10, "Slash")
```

### `owner`

`owner` is the hero using the move.

You can read values like:

```python
owner["hp"]
owner["mp"]
owner["ap"]
owner["position"]
owner["character"]["name"]
owner["modifiedStats"]["brawn"]
owner["modifiedStats"]["brain"]
owner["modifiedStats"]["speed"]
```

### `target`

`target` is the enemy hero.

You can read similar values:

```python
target["hp"]
target["shield"]
target["status"]
target["position"]
```

### `ctx`

`ctx` is the safest way to affect the battle.

It gives you helper methods from the game engine.

## Common `ctx` Methods

### Damage

```python
ctx.deal_damage(target, 10, "Punch")
```

This deals damage and handles shield correctly.

### Healing

```python
ctx.heal(owner, 8)
```

This heals the target up to max HP.

### Shield

```python
ctx.add_shield(owner, 5, "Magic Barrier")
```

### Apply a status

```python
ctx.apply_status(target, "Burn", 3, can_stack=False, effect_type="burn_1", caster=owner)
```

Current built-in effect types include:

- `"burn_1"`
- `"bleed_1"`
- `"bleed_2"`
- `"focused_ap"`

If you need a brand new kind of status effect, ask the teacher to add it to the engine.

### Movement

```python
ctx.move_forward(owner)
ctx.move_backward(owner)
```

### Distance

```python
distance = ctx.distance(owner, target)
```

### Logging

```python
ctx.log(f"{owner['character']['name']} bends time.")
```

This adds a message to the battle log.

## Action And Spell Fields

Each action or spell dictionary has information that tells the engine how the move works.

Common fields:

- `id`: unique code name, usually lowercase with hyphens
- `name`: display name shown in the UI
- `cost`: AP cost
- `apCost`: AP cost, same idea as `cost`
- `mpCost`: MP cost
- `speed`: how fast the move is
- `range`: how far away the target can be
- `kind`: `"action"` or `"spell"`
- `alignment`: optional bonus stat for extra damage
- `effect`: the function that runs the ability

Example:

```python
{
    "id": "shadow-sting",
    "name": "Shadow Sting",
    "cost": 1,
    "mpCost": 2,
    "speed": 4,
    "range": 1,
    "kind": "spell",
    "alignment": "brain",
    "effect": shadow_sting,
}
```

## What `range` Means

You can use:

- `1`
- `2`
- `"ranged"`
- `"global"`
- `"melee"`
- `"adjacent"`

Examples:

```python
"range": 1
"range": "ranged"
"range": "global"
```

## What `alignment` Means

Some abilities can do extra bonus damage based on a stat.

Example:

```python
"alignment": "brain"
```

This means after the main effect does damage, the engine may add extra damage based on the hero's `brain` stat.

Common alignments:

- `"brain"`
- `"speed"`
- `"brawn"` if the teacher adds support for it later

## Good Example Hero

### `actions.py`

```python
def spear_jab(ctx, owner, target):
    damage = 6 + owner["modifiedStats"]["brawn"]
    ctx.deal_damage(target, damage, "Spear Jab")


ACTIONS = [
    {
        "id": "spear-jab",
        "name": "Spear Jab",
        "cost": 1,
        "speed": 3,
        "range": 2,
        "kind": "action",
        "effect": spear_jab,
    }
]
```

### `spells.py`

```python
def frost_mark(ctx, owner, target):
    ctx.deal_damage(target, 4, "Frost Mark")
    ctx.log(f"{target['character']['name']} is chilled by frost magic.")


SPELLS = [
    {
        "id": "frost-mark",
        "name": "Frost Mark",
        "mpCost": 4,
        "speed": 2,
        "range": "ranged",
        "kind": "spell",
        "effect": frost_mark,
    }
]
```

### `hero.py`

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

## Things To Avoid

- Do not edit `backend/server.py` for a normal hero
- Do not put everything in one giant file
- Do not manually change global match state unless you know exactly what you are doing
- Do not invent new engine systems by guessing

If your hero idea needs something the engine does not support yet, ask the teacher.

Examples:

- money
- cooldowns
- age-changing powers
- queue swapping
- stealing or copying abilities
- changing turn order

Those are great ideas, but they may need new engine support first.

## Simple Rule

Use your hero folder for:

- stats
- actions
- spells
- hero-specific logic

Use the engine for:

- shared systems
- shared rules
- battle structure

## Final Checklist

Before testing your hero, check:

- did you create a new folder in `backend/heroes/`?
- did you add `hero.py`, `actions.py`, and `spells.py`?
- does `hero.py` export a variable named `HERO`?
- does each action or spell have an `id`, `name`, and `effect`?
- are your effect functions using `ctx`, `owner`, and `target` correctly?

If all of that is correct, your hero should be loadable by the backend.
