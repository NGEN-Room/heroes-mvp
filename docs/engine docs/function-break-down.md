# Function Break Down

This doc explains why your ability function uses names like:

```python
def bonk(owner, target, state):
```

or:

```python
def bonk(ctx, owner, target):
```

## Why Not Just `def bonk(target)`?

Because most abilities need more information than just the victim.

The engine often needs your function to know:

- who used the move
- who got targeted
- what the full battle state is

So this:

```python
def bonk(target):
    target["hp"] -= 10
```

is too limited for most game logic.

It gives you no direct access to:

- the attacking hero
- the battle log
- positions
- statuses
- queues
- the full match state

## What `owner` Means

`owner` is the hero using the move.

Example:

```python
owner["character"]["name"]
owner["modifiedStats"]["brawn"]
owner["hp"]
owner["position"]
```

## What `target` Means

`target` is the hero receiving the move.

Example:

```python
target["hp"]
target["shield"]
target["status"]
target["position"]
```

## What `state` Means

`state` is the full match state.

Example:

```python
state["player1"]
state["player2"]
state["logs"]
state["flavour"]
state["round"]
```

## What `ctx` Means

`ctx` means context.

It is a helper object built by this project.

It is not an outside library.

It gives you shortcuts for things like:

- damage
- healing
- status
- movement
- logging

## Supported Function Shapes

The engine supports:

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

Best classroom shapes:

```python
def move(ctx, owner, target):
```

or:

```python
def move(owner, target, state):
```

## Direct Comparison

### Student assumption

```python
def bonk(target):
    target["hp"] -= 10
```

### Better direct version

```python
def bonk(owner, target, state):
    target["hp"] -= 10
    state["logs"].append(f"{owner['character']['name']} bonks {target['character']['name']}.")
```

### `ctx` version

```python
def bonk(ctx, owner, target):
    ctx.deal_damage(target, 10, "Bonk")
```
