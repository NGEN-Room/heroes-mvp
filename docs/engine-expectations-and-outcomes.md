# Engine Expectations And Outcomes

This doc explains what the engine expects from your code and what it does for you automatically.

## What The Engine Expects

For every action or spell, the engine expects:

1. a dictionary of metadata
2. an `effect` function

Example:

```python
def bonk(owner, target, state):
    target["hp"] -= 10


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

## What The Engine Does Before Your Function Runs

The engine handles:

- queueing
- round order
- speed sorting
- AP and MP checks
- range checks

If a move is out of range, the move fails before your effect runs.

## What The Engine Does After Your Function Runs

Depending on the move, the engine may:

- calculate alignment bonus damage
- add logs
- clear queues at round end
- regenerate resources
- check for a winner

## What Your Function Usually Does

Your function usually handles the hero-specific effect, such as:

- damage
- healing
- shield
- status
- movement
- weird custom logic

## Live Battle Data Students Usually Manipulate

Examples:

```python
owner["hp"]
owner["mp"]
owner["ap"]
owner["position"]
owner["status"]
target["hp"]
target["shield"]
target["status"]
state["logs"]
state["flavour"]
```

## Common Mistake

This looks reasonable but is usually wrong:

```python
target["baseStats"]["hp"] -= 10
```

That changes template-style data, not live battle HP.

Usually you want:

```python
target["hp"] -= 10
```

## Good Mental Model

- metadata describes the move
- the effect function changes the battle
- the engine manages turn rules around your function
