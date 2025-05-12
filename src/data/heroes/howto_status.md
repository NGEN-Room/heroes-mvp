# 🧪 How to Apply a Status Effect

In Heroes Banquet, there are **three ways** to apply a status effect to a character.

---

## ✅ Option 1: `establishStatus()` (Recommended)
This is the most powerful and engine-integrated method.
It handles:
- Logging to the UI
- Caster context (e.g., “who applied it”)
- Duplicate prevention
- CanStack rules

```js
import { establishStatus } from "@/engine/statusWatch";

burningHands: {
  name: "Burning Hands",
  mpCost: 5,
  speed: 1,
  effect: (self, target, state) => {
    const dmg = 10;
    target.hp -= dmg;

    establishStatus(target, {
      name: "Burn",
      turns: 5,
      canStack: false,
      effectFn: (target) => {
        target.hp -= 1;
      }
    }, self);
  }
}
```
✅ Use this for most spells. It’s clear, safe, and powerful.

---

## ⚙️ Option 2: `applyStatus()` (Manual + Engine Logging)
You manually build a status object, then push it through the engine.
This gives you:
- Logging
- Duplicate prevention and canStack support
- **No caster context**

```js
import { applyStatus } from "@/engine/statusWatch";

burningHands: {
  name: "Burning Hands",
  mpCost: 5,
  speed: 1,
  effect: (self, target, state) => {
    const dmg = 10;
    target.hp -= dmg;

    const burn = {
      name: "Burn",
      turnsRemaining: 5,
      canStack: false,
      effect: (target) => {
        target.hp -= 1;
      }
    };

    applyStatus(target, burn);
  }
}
```
✅ Use this if you don’t need caster info, but still want proper behavior.

---

## 🛠 Option 3: Manual Push (Raw Mode)
If you want full control:
- You can directly modify `target.status`
- You must handle **everything** manually

```js
burningHands: {
  name: "Burning Hands",
  mpCost: 5,
  speed: 1,
  effect: (self, target, state) => {
    const dmg = 10;
    target.hp -= dmg;

    const existing = target.status.find(s => s.name === "Burn");

    if (!existing) {
      const burn = {
        name: "Burn",
        turnsRemaining: 5,
        canStack: false,
        effect: (target) => {
          target.hp -= 1;
        }
      };

      target.status.push(burn);
      // Optional logging:
      // battleLog(state, `${target.character.name} is now burning`);
    }
  }
}
```
✅ This is powerful, but **you are on your own**. Use this if you're building advanced effects.

---

## 🔁 Summary
| Feature                      | `establishStatus` ✅ | `applyStatus` ⚙️ | `push()` 🛠️ |
|------------------------------|----------------------|------------------|-------------|
| UI logging                   | ✅                   | ✅               | ❌ (manual) |
| CanStack / duplicate check   | ✅                   | ✅               | ❌          |
| Caster context (`self`)      | ✅                   | ❌               | ❌          |
| Manual control               | 🟡 (auto-managed)    | ✅               | ✅          |

Use whichever best fits your spell style — just **don’t mix types within one spell**.
