# Statuses

Statuses are effects that stay on a hero over time.

Examples:

- burn
- bleed
- focused
- stunned
- held

## `ctx` Style

```python
def burning_touch(ctx, owner, target):
    ctx.deal_damage(target, 4, "Burning Touch")
    ctx.apply_status(target, "Burn", 3, can_stack=False, effect_type="burn_1", caster=owner)
```

For control effects, use the helper methods:

```python
def vine_grasp(ctx, owner, target):
    ctx.hold(target, 2, caster=owner)


def shocking_bonk(ctx, owner, target):
    ctx.stun(target, 1, caster=owner)
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
- `held`
- `stun`
- `dodge` (uses the status `dodgeModifier` value, positive or negative)
- `dodge_down` (decreases dodge; defaults to -10 if no `dodgeModifier` is set)

If you want a completely new effect type, that is usually a teacher engine change.

## Dodge Status Example

```python
def nimble(ctx, owner, target):
    ctx.apply_status(owner, "Nimble", 3, can_stack=True, effect_type="dodge", dodge_modifier=10, caster=owner)


def off_balance(ctx, owner, target):
    ctx.apply_status(target, "Off Balance", 2, can_stack=False, effect_type="dodge", dodge_modifier=-10, caster=owner)
```

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
