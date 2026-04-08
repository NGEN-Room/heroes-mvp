# How To Use The `ctx` Tool

`ctx` is a helper object the engine gives you when your ability runs.

It is useful when you want engine support without importing lots of files manually.

## Function Shape

```python
def fire_bolt(ctx, owner, target):
    ctx.deal_damage(target, 10, "Fire Bolt")
```

## What `ctx` Gives You

### Damage

```python
ctx.deal_damage(target, 10, "Punch")
```

### Healing

```python
ctx.heal(owner, 8)
```

### Shield

```python
ctx.add_shield(owner, 5, "Barrier")
```

### Status

```python
ctx.apply_status(target, "Burn", 3, can_stack=False, effect_type="burn_1", caster=owner)
```

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

## Accessing The Whole Battle State

`ctx` also contains the full battle state:

```python
def weird_spell(ctx, owner, target):
    state = ctx.state
    state["flavour"].append("Time shivers.")
```

## When To Use `ctx`

Use `ctx` when:

- you want a simpler way to write abilities
- you want shield and damage rules handled properly
- you want engine helpers without importing them manually

You do not have to use `ctx`. It is optional.
