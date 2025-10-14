// engine/combatUtils.js
//
// Shared helpers for applying damage, healing, and shield management.

import { battleLog } from "./battleLog.js";

export function dealDamage(target, amount, state, label) {
  if (!target || typeof amount !== "number" || amount <= 0) {
    return { total: 0, hp: 0, shield: 0 };
  }

  let remaining = Math.max(0, amount);
  if (typeof target.shield !== "number") {
    target.shield = 0;
  }

  const initialShield = target.shield;
  const shieldAbsorbed = Math.min(initialShield, remaining);
  target.shield = initialShield - shieldAbsorbed;
  remaining -= shieldAbsorbed;

  const initialHp = target.hp ?? 0;
  const newHp = Math.max(initialHp - remaining, 0);
  const hpLost = initialHp - newHp;
  target.hp = newHp;

  if (state && shieldAbsorbed > 0) {
    const targetName = target.character?.name || "Target";
    const suffix = label ? ` from ${label}` : "";
    battleLog(state, `${targetName}'s shield absorbs ${shieldAbsorbed} dmg${suffix}.`);
  }

  return {
    total: amount,
    hp: hpLost,
    shield: shieldAbsorbed
  };
}

export function healCharacter(target, amount) {
  if (!target || typeof amount !== "number" || amount <= 0) {
    return { healed: 0, overflow: 0 };
  }

  const maxHp = target.modifiedStats?.hp ?? target.hp ?? 0;
  const missing = Math.max(0, maxHp - (target.hp ?? 0));
  const healed = Math.min(missing, amount);

  target.hp = Math.min((target.hp ?? 0) + healed, maxHp);

  return {
    healed,
    overflow: amount - healed
  };
}

export function addShield(target, amount, state, label) {
  if (!target || typeof amount !== "number" || amount <= 0) {
    return 0;
  }

  if (typeof target.shield !== "number") {
    target.shield = 0;
  }

  target.shield += amount;

  if (state) {
    const targetName = target.character?.name || "Target";
    const suffix = label ? ` from ${label}` : "";
    battleLog(state, `${targetName} gains a shield of ${amount}${suffix}.`);
  }

  return target.shield;
}
