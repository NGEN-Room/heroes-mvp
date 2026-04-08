# How To Build Your Own Function

You can write abilities without using `ctx`.

This is the more direct style.

## Direct-State Style

```python
def shadow_strike(owner, target, state):
    target["hp"] -= 8
    state["logs"].append(f"{owner['character']['name']} strikes from the shadows.")
```

This style gives you direct access to:

- `owner`
- `target`
- `state`

## Importing Engine Helpers Yourself

You can also import tools directly from the engine:

```python
from backend.engine.combat import deal_damage
from backend.engine.status import establish_status


def venom_blade(owner, target, state):
    deal_damage(target, 6, state, "Venom Blade")
    establish_status(target, "Poison", 3, False, "burn_1", owner, state)
```

## Supported Function Shapes

The engine supports all of these:

```python
def move_a(ctx, owner, target):
    ...

def move_b(owner, target, state):
    ...

def move_c(ctx, owner, target, state):
    ...

def move_d(owner, target):
    ...
```

Preferred classroom shapes:

- `def effect(ctx, owner, target):`
- `def effect(owner, target, state):`

## When To Build Your Own Function

Use this approach when:

- you want maximum control
- you want to experiment directly with battle data
- you want to import engine helpers yourself
- you want to debug how the engine really works

If something breaks, that is part of the learning process.
