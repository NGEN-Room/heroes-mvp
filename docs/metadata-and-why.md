# Metadata And Why

This is one of the most important concepts in the engine.

## The Function Is Not Enough

Students often think:

```python
def bonk(owner, target, state):
    target["hp"] -= 10


SPELLS = [bonk]
```

But the engine cannot use just the function by itself.

It also needs metadata.

## What Metadata Means

Metadata is the information that describes the move.

Example:

```python
{
    "id": "bonk",
    "name": "Bonk",
    "cost": 1,
    "speed": 2,
    "range": 1,
    "kind": "action",
    "effect": bonk,
}
```

## Why The Engine Needs Metadata

The engine needs to know:

- what the move is called
- whether it is an action or spell
- how much AP it costs
- how much MP it costs
- how fast it is
- how far it can reach
- which function to run

Without that information, the engine cannot:

- show the move in the UI
- queue it correctly
- check costs
- check range
- sort turn order

## Think Of It Like This

The metadata tells the engine:

“Here is what this move is.”

The function tells the engine:

“Here is what this move does.”

You need both.

## Minimal Valid Shape

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
