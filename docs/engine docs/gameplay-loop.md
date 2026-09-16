# Gameplay Loop

The game is designed so that every round asks players to make a new choice.

## One Choice Per Hero

Each hero chooses **one ability** each round. The game resolves both choices in
speed order, then starts the next round.

This keeps the match readable and stops a player from filling a queue with the
same cheap attack.

## Resources

- **AP refills to its maximum** at the end of each round. Normal actions should
  use AP, so every hero has something useful to do each round.
- **MP is special-resource fuel.** It regenerates at least 1 point each round;
  heroes with more Brain regenerate more. Spells can be powerful because they
  cost MP, but no hero should need to wait doing nothing: they should always
  have an AP action.

## Cooldowns

An ability can add a cooldown to its metadata:

```python
{
    "id": "big-dwagon-dream",
    "name": "Big Dwagon Dream",
    "mpCost": 22,
    "cooldown": 2,
    "effect": big_dwagon_dream,
}
```

After use, it cannot be chosen for the next two rounds. Cooldowns are optional;
use them for particularly strong abilities, not every ability.

## A Good Hero Kit

Give a hero a reliable action, a setup/defence/movement option, and a stronger
move with a cost, condition, or cooldown. The goal is a meaningful choice every
round, rather than one always-best button.
