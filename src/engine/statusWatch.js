// engine/statusWatch.js

import { battleLog } from "./battleLog.js";

export function applyStatus(battleCharacter, statusObj) {
  try {
    const alreadyExists = battleCharacter.status.find(s => s.name === statusObj.name);

    if (statusObj.canStack || !alreadyExists) {
      battleCharacter.status.push({ ...statusObj });
      if (battleCharacter.character && battleCharacter.character.name) {
        battleLog(
          battleCharacter.state || {},
          `${battleCharacter.character.name} is now ${statusObj.name} for ${statusObj.turnsRemaining} turns`
        );
      }
    }
  } catch (err) {
    console.warn("⚠️ applyStatus error:", err);
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