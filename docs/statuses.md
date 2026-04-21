# Statuses

Statuses are effects that stay on a hero over time.

Examples:

- burn
- bleed
- focused

## `ctx` Style

```python
def burning_touch(ctx, owner, target):
    ctx.deal_damage(target, 4, "Burning Touch")
    ctx.apply_status(target, "Burn", 3, can_stack=False, effect_type="burn_1", caster=owner)
```

## Direct Engine Style

```python
from backend.engine.status import establish_status
from backend.engine.combat import deal_damage


def burning_touch(owner, target, state):
    deal_damage(target, 4, state, "Burning Touch")
    establish_status(target, "Burn", 3, False, "burn_1", owner, state)
```

## Current Built-In Effect Types

- `burn_1`
- `bleed_1`
- `bleed_2`
- `focused_ap`

If you want a completely new effect type, that is usually a teacher engine change.

## Direct Manual Experimentation

Students can also experiment directly with:

```python
target["status"]
```

Example:

```python
def weird_mark(owner, target, state):
    target["status"].append({
        "name": "Weird Mark",
        "turnsRemaining": 2,
        "canStack": False,
        "effectType": "burn_1",
        "sourceName": owner["character"]["name"],
    })
```
