# Character

The hero definition in `hero.py` describes your character template.

Example:

```python
HERO = {
    "id": "ice-guard",
    "name": "Ice Guard",
    "character": {
        "name": "Ice Guard",
        "age": 31,
        "class": {"className": "Warrior"},
        "baseStats": {"hp": 110, "mp": 30, "ap": 4},
        "rawStats": {"brawn": 7, "brain": 4, "speed": 5},
    },
    "actions": ACTIONS,
    "spells": SPELLS,
}
```

## What The Main Fields Mean

- `id`: code id used by the backend
- `name`: short display name
- `character["name"]`: full in-game name
- `age`: used by the stat modifier system
- `class`: hero class data
- `baseStats`: starting HP, MP, AP before modifiers
- `rawStats`: brawn, brain, speed before modifiers

## Important Distinction

Your hero template is not the same as live battle data.

This is very important.

### Template data

This lives in `hero.py`:

```python
character["baseStats"]["hp"]
character["rawStats"]["brain"]
```

### Live battle data

This is what your ability functions modify:

```python
owner["hp"]
owner["mp"]
owner["ap"]
owner["position"]
target["hp"]
target["status"]
```

If you want to damage someone during combat, usually change:

```python
target["hp"]
```

not:

```python
target["character"]["baseStats"]["hp"]
```

because `baseStats` is just the template.
