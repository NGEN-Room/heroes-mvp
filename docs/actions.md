# Actions

Actions are usually physical moves, attacks, or utility abilities.

They normally cost AP.

## Basic Example

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

## Action Dictionary Fields

- `id`: unique code name
- `name`: display name
- `cost`: AP cost
- `speed`: turn priority boost
- `range`: maximum distance
- `minRange`: optional minimum distance
- `kind`: should be `"action"`
- `alignment`: optional bonus scaling
- `effect`: the Python function that runs

## What The Engine Does For Actions

Before your effect runs, the engine handles:

- queue order
- speed sorting
- range checking
- AP/MP cost checking
- turn execution order

Then your effect function runs.

After that, the engine may:

- apply alignment bonus damage
- log the move
- regenerate some resources at round end

## Minimal Action Example

```python
def jab(owner, target, state):
    target["hp"] -= 4
```

That is enough for the effect logic, but you still need metadata:

```python
{
    "id": "jab",
    "name": "Jab",
    "cost": 1,
    "speed": 1,
    "range": 1,
    "kind": "action",
    "effect": jab,
}
```

## Why `SPELLS = [bonk]` Will Not Work

This will not work:

```python
SPELLS = [bonk]
```

because the engine needs more than just the function.

It needs the metadata so it knows:

- how much the move costs
- how far it reaches
- how fast it is
- what name to show in the UI

That is why actions and spells are lists of dictionaries, not lists of plain functions.
