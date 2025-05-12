# 🧠 Creating Actions and Spells

In Heroes Banquet, **spells** and **actions** are how heroes perform attacks, cast magic, apply status effects, and interact with the battlefield.
They follow a similar structure but have different resource requirements.

---

## ✨ Actions
Actions are usually **physical**, use **AP (Action Points)**, and appear in the hero’s `actions` object.

```js
stab: {
  name: "Stab",
  cost: 1,             // AP cost
  speed: 2,            // Initiative boost
  alignment: "brawn", // Optional: stat that scales the damage
  effect: (self, target, state) => {
    const dmg = 5;
    target.hp -= dmg;
  }
}
```

| Key | Type | Description |
|-----|------|-------------|
| `name` | string | Display name |
| `cost` | number | AP cost (required for actions) |
| `speed` | number | Optional turn priority boost |
| `alignment` | string | Optional stat for bonus scaling (e.g., `brawn`) |
| `effect` | function | `(self, target, state)` — executes the action |

✅ Actions are queued in `player.actions` and resolved in turn order.

---

## 🔮 Spells
Spells are usually **magical**, use **MP (Mana Points)**, and live in the hero’s `spells` object.

```js
firebolt: {
  name: "Firebolt",
  mpCost: 10,          // MP cost only (no AP needed)
  speed: 1,
  alignment: "brains",
  effect: (self, target, state) => {
    const dmg = 12;
    target.hp -= dmg;
  }
}
```

| Key | Type | Description |
|-----|------|-------------|
| `name` | string | Spell name |
| `mpCost` | number | Mana cost |
| `speed` | number | Optional turn priority |
| `alignment` | string | Optional stat used to scale damage |
| `effect` | function | Core logic that runs when spell activates |

✅ Spells use no AP by default. You can add `cost` if you want to require both AP and MP.

---

## 💡 Action & Spell `effect()` Signature
Every effect function should follow this signature:

```js
effect: (self, target, state) => {
  // self = your hero
  // target = opponent
  // state = full battle state object
}
```

This allows access to all character info, logging functions, and status handling.

---

## 🧪 Integrating with Status Effects
Inside your `effect`, you can apply statuses using one of the supported methods:

```js
import { establishStatus } from "@/engine/statusWatch";

establishStatus(target, {
  name: "Burn",
  turns: 3,
  canStack: false,
  effectFn: (target) => {
    target.hp -= 1;
  }
}, self);
```

See the **Status README** for more on `applyStatus()` and manual push methods.

---

## ✅ Engine Enhancements
The engine automatically logs and scales damage based on `alignment`:
- If alignment is `brains`, `brawn`, etc., bonus damage is added from `self.modifiedStats.alignment`
- Battle log shows:
  ```
  Thorn uses Slash for 15 dmg
  Kaia uses Firebolt for 22 dmg
  ```

No need to call `battleLog()` manually unless you want flavor-only entries.

---

## 🔁 Summary Table
| Feature | Actions | Spells |
|---------|---------|--------|
| Uses AP | ✅       | ❌ (unless added) |
| Uses MP | ❌       | ✅     |
| Custom Speed | ✅ | ✅     |
| Status Capable | ✅ | ✅     |
| Can scale via alignment | ✅ | ✅     |

Let us know if you want to create multi-target spells, healing moves, or cooldown-based effects next!
