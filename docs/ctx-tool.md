# `ctx` Tool

`ctx` stands for context.

It is a helper object created by this project.

It is not a third-party library.

The code for it is in:

- [backend/engine/context.py](/Users/piha/development/heroes-mvp/backend/engine/context.py)

## What `ctx` Does

It gives you shortcuts for common engine operations.

## Example

```python
def fireball(ctx, owner, target):
    ctx.deal_damage(target, 10, "Fireball")
```

## Current `ctx` Methods

### Damage

```python
ctx.deal_damage(target, 10, "Punch")
```

### Heal

```python
ctx.heal(owner, 5)
```

### Shield

```python
ctx.add_shield(owner, 4, "Barrier")
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
ctx.distance(owner, target)
```

### Logging

```python
ctx.log("Reality cracks.")
```

### Full State

```python
ctx.state
```

## When To Use `ctx`

Use `ctx` when you want:

- convenient engine helpers
- faster coding
- simpler access to battle tools

Do not feel forced to use it.

Direct state manipulation is also allowed in this project.
