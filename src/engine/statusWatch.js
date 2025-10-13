// engine/statusWatch.js

import { battleLog } from "./battleLog.js";

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
