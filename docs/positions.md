# Positions

The game uses a one-dimensional battlefield.

- Player 1 starts at `0`
- Player 2 starts at `5`

Distance is the absolute difference between positions.

## Range

Examples:

```python
"range": 1
"range": 2
"range": "ranged"
"range": "global"
```

Optional:

```python
"minRange": 2
```

## Core Movement

All heroes automatically get:

- `Advance`
- `Retreat`

## `ctx` Style

```python
def dash(ctx, owner, target):
    ctx.move_forward(owner)
    ctx.move_forward(owner)
```

## Direct Engine Style

```python
from backend.engine.positioning import move_forward


def dash(owner, target, state):
    move_forward(owner, state, 2)
```

## Distance Checking

```python
def spear_throw(ctx, owner, target):
    if ctx.distance(owner, target) <= 2:
        ctx.deal_damage(target, 6, "Spear Throw")
```
