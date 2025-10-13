# Positioning & Range Primer

Heroes Banquet now tracks combatants on a simple one-dimensional grid. Player 1 begins at slot **0**, Player 2 at slot **5**. Every slot is adjacent to its neighbors, and distance is measured by the absolute difference between slots.

---

## Ability Range
- Add `range` (number or keyword) to any action/spell to limit targets.
- Supported keywords: `melee/adjacent (1)`, `reach (1 - 2)`, `ranged (1 - 4)`, `global` (Infinity).
- Optional `minRange` blocks attacks that are *too* close (e.g., `minRange: 2` for longbows).
- If a target is out of range, the engine logs a miss and refunds the AP/MP cost.

```js
singleshot: {
  name: "Singleshot",
  apCost: 1,
  range: "ranged",
  effect: (self, target) => {
    target.hp -= 5;
  }
},
longbow: {
  name: "Long Bow Shot",
  apCost: 1,
  range: "ranged",
  minRange: 2 // can fire if within 0 - 2 range of target
  effect: (self, target) => {
    target.hp -= 6;
  }
}
```

---

## Core Movement Actions
Every hero automatically gets two utility actions:
- **Advance** - costs 1 AP, speed 5, moves toward the opponent.
- **Retreat** - costs 1 AP, speed 5, moves away.

Movement respects grid limits (0–5). Attempts to move beyond the arena simply log a warning.

You can still craft bespoke mobility by writing custom actions—just call `moveForward(self, state, steps)` or `moveBackward(self, state, steps)` from `@/engine/positioning`.

```js
import { moveForward } from "@/engine/positioning";

dash: {
  name: "Dash",
  cost: 2,
  speed: 6,
  range: 0,
  effect: (self, target, state) => {
    moveForward(self, state, 2); // leap two tiles forward
  }
}
```

---

## Tips
- Long-range abilities (range >= 3) combine well with **Retreat** to kite melee foes.
- Position shows up on the player portal UI so you can sanity-check spacing mid-match.
- Ready for 2D later? Keep using the helpers; the API is designed so we can expand to `{x, y}` without rewriting every spell.
