# How To Build Position

Heroes fight on a one-dimensional line.

- Player 1 starts at position `0`
- Player 2 starts at position `5`

Distance is the absolute difference between positions.

## Range

You can add `range` to an action or spell.

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

That blocks targets that are too close.

## Core Movement

Every hero automatically gets:

- `Advance`
- `Retreat`

## Using `ctx`

```python
def dash(ctx, owner, target):
    ctx.move_forward(owner)
    ctx.move_forward(owner)
```

## Using Engine Imports Directly

```python
from backend.engine.positioning import move_forward, move_backward


def dash(owner, target, state):
    move_forward(owner, state, 2)


def hop_back(owner, target, state):
    move_backward(owner, state, 1)
```

## Checking Distance

Using `ctx`:

```python
def spear_throw(ctx, owner, target):
    if ctx.distance(owner, target) <= 2:
        target["hp"] -= 6
```

Using engine import:

```python
from backend.engine.positioning import get_distance


def spear_throw(owner, target, state):
    if get_distance(owner, target) <= 2:
        target["hp"] -= 6
```

## Tips

- melee heroes often want movement abilities
- ranged heroes often want retreat abilities
- if your move needs unusual positioning rules, ask the teacher before changing the shared engine
