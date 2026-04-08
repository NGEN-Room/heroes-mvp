# How To Build Status

Statuses are effects that stay on a hero for multiple turns.

Examples:

- burn
- bleed
- poison
- focus
- stun

## Using `ctx`

```python
def burning_touch(ctx, owner, target):
    ctx.deal_damage(target, 4, "Burning Touch")
    ctx.apply_status(target, "Burn", 3, can_stack=False, effect_type="burn_1", caster=owner)
```

## Using Engine Imports Directly

```python
from backend.engine.status import establish_status
from backend.engine.combat import deal_damage


def burning_touch(owner, target, state):
    deal_damage(target, 4, state, "Burning Touch")
    establish_status(target, "Burn", 3, False, "burn_1", owner, state)
```

## Current Built-In Status Effect Types

- `burn_1`
- `bleed_1`
- `bleed_2`
- `focused_ap`

These are handled in the shared engine.

## Making A Brand New Status Type

If you want something totally new, like:

- freeze
- time lock
- bankrupt
- action swap curse

then the teacher may need to add a new engine rule first.

## Manual Status Manipulation

If you want to experiment directly, you can manipulate:

```python
target["status"]
```

Example:

```python
def strange_mark(owner, target, state):
    target["status"].append({
        "name": "Strange Mark",
        "turnsRemaining": 2,
        "canStack": False,
        "effectType": "burn_1",
        "sourceName": owner["character"]["name"],
    })
```

That is more experimental and less protected, but it is allowed if you want to explore.
