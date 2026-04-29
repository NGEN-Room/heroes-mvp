# Spells

Spells are magical or unusual abilities.

They usually cost MP.

## Example

```python
def fireball(ctx, owner, target):
    ctx.deal_damage(target, 10, "Fireball")


SPELLS = [
    {
        "id": "fireball",
        "name": "Fireball",
        "mpCost": 5,
        "speed": 1,
        "range": "ranged",
        "kind": "spell",
        "effect": fireball,
    }
]
```

## Spell Fields

- `id`
- `name`
- `mpCost`
- `cost` if you also want AP cost
- `speed`
- `range`
- `minRange`
- `kind`: should be `"spell"`
- `alignment`
- `effect`

## Direct Style Spell

```python
def fireball(owner, target, state):
    target["hp"] -= 10
    state["logs"].append(f"{owner['character']['name']} hurls a fireball.")
```

## `ctx` Style Spell

```python
def fireball(ctx, owner, target):
    ctx.deal_damage(target, 10, "Fireball")
```

Both are valid.

## When To Use A Spell Instead Of An Action

Use spells when the move:

- feels magical
- costs MP
- uses status effects
- bends rules in unusual ways
- changes resources, time, age, or battlefield conditions
