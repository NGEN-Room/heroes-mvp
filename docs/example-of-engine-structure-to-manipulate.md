# Example Of Engine Structure To Manipulate

This is a rough mental model of the battle data your functions can work with.

## `owner`

```python
{
    "heroId": "thorn",
    "character": {
        "name": "Thorn Ironfist",
        "age": 35,
        "class": {"className": "Warrior"},
        "baseStats": {...},
        "rawStats": {...},
    },
    "modifiedStats": {
        "brawn": 8,
        "brain": 3,
        "speed": 4,
        "hp": 150,
        "mp": 20,
        "ap": 5,
    },
    "hp": 150,
    "mp": 20,
    "ap": 5,
    "position": 0,
    "status": [],
    "shield": 0,
    "queue": [],
}
```

## `target`

`target` has the same shape as `owner`.

## `state`

```python
{
    "id": "...",
    "player1": {...},
    "player2": {...},
    "round": 1,
    "history": [],
    "logs": [],
    "flavour": [],
    "grid": {"min": 0, "max": 5},
}
```

## Things Students Can Safely Explore

- `owner["hp"]`
- `owner["mp"]`
- `owner["ap"]`
- `owner["position"]`
- `owner["status"]`
- `target["hp"]`
- `target["shield"]`
- `target["status"]`
- `state["logs"]`
- `state["flavour"]`

## Example Direct Manipulation

```python
def age_drain(owner, target, state):
    target["character"]["age"] += 10
    state["logs"].append(f"{target['character']['name']} rapidly ages!")
```

## Example Mixed Style

```python
from backend.engine.combat import deal_damage


def merchant_curse(ctx, owner, target):
    deal_damage(target, 3, ctx.state, "Merchant Curse")
    ctx.state["flavour"].append("Coins spill across the arena floor.")
```

## Important Idea

You are allowed to experiment with this data.

But if you want a mechanic that should become part of the game for many heroes, that should usually be added properly to the shared engine by the teacher.
