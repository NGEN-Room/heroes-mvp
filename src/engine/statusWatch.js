// engine/statusWatch.js

import { battleLog } from "./battleLog.js";

const STUN_EFFECT_TYPES = new Set(["stun", "stunned"]);
const STUN_STATUS_NAMES = new Set(["stun", "stunned"]);

const HELD_EFFECT_TYPES = new Set(["held", "hold", "root", "rooted", "snare", "snared"]);
const HELD_STATUS_NAMES = new Set(["held", "hold", "rooted", "root", "snared", "snare"]);

function normalized(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function hasStatusRule(battleCharacter, { effectTypes = [], names = [] } = {}) {
  const effectTypeSet = new Set(Array.from(effectTypes).map(normalized));
  const nameSet = new Set(Array.from(names).map(normalized));

  return (battleCharacter?.status || []).some((status) => {
    const effectType = normalized(status.effectType);
    const name = normalized(status.name);
    return (effectType && effectTypeSet.has(effectType)) || (name && nameSet.has(name));
  });
}

export function isStunned(battleCharacter) {
  return hasStatusRule(battleCharacter, {
    effectTypes: STUN_EFFECT_TYPES,
    names: STUN_STATUS_NAMES
  });
}

export function isHeld(battleCharacter) {
  return hasStatusRule(battleCharacter, {
    effectTypes: HELD_EFFECT_TYPES,
    names: HELD_STATUS_NAMES
  });
}

export function applyStatus(battleCharacter, statusObj, state) {
  try {
    const alreadyExists = battleCharacter.status.find(s => s.name === statusObj.name);

    if (statusObj.canStack || !alreadyExists) {
      battleCharacter.status.push({ ...statusObj });
      const battleState = state ?? battleCharacter.state;
      if (battleState && battleCharacter.character && battleCharacter.character.name) {
        battleLog(
          battleState,
          `${battleCharacter.character.name} is now ${statusObj.name} for ${statusObj.turnsRemaining} turns`
        );
      }
    }
  } catch (err) {
    console.warn("⚠️ applyStatus error:", err);
  }
}


export function establishStatus(target, { name, turns, canStack, effectFn }, caster, state) {
  try {
    const status = {
      name,
      turnsRemaining: turns,
      canStack: !!canStack,
      effect: (t) => effectFn(t, caster)
    };

    const battleState = state ?? caster?.state ?? target?.state;
    applyStatus(target, status, battleState);
  } catch (err) {
    console.warn("⚠️ establishStatus error:", err);
  }
}

export function resolveStatuses(battleCharacter) {
  try {
    battleCharacter.status.forEach(status => {
      if (typeof status.effect === 'function') {
        status.effect(battleCharacter);
      }
      status.turnsRemaining -= 1;
    });

    clearExpiredStatuses(battleCharacter);
  } catch (err) {
    console.warn("⚠️ resolveStatuses error:", err);
  }
}

function clearExpiredStatuses(battleCharacter) {
  battleCharacter.status = battleCharacter.status.filter(s => s.turnsRemaining > 0);
}
