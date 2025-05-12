// engine/statusWatch.js

// Apply a new status (helper function)
export function applyStatus(battleCharacter, statusObj) {
  const alreadyExists = battleCharacter.status.find(s => s.name === statusObj.name);

  // Allow stacking if statusObj.canStack is true
  if (statusObj.canStack || !alreadyExists) {
    battleCharacter.status.push(statusObj);
  }
}

// Create a new status with context and caster info
export function establishStatus(target, { name, turns, canStack, effectFn }, caster) {
  const status = {
    name,
    turnsRemaining: turns,
    canStack: !!canStack,
    effect: (target) => effectFn(target, caster)
  };

  applyStatus(target, status);
}

// Resolve all statuses on a battle character
export function resolveStatuses(battleCharacter) {
  battleCharacter.status.forEach(status => {
    if (typeof status.effect === 'function') {
      status.effect(battleCharacter);
    }

    status.turnsRemaining -= 1;
  });

  clearExpiredStatuses(battleCharacter);
}

// Clear expired statuses
function clearExpiredStatuses(battleCharacter) {
  battleCharacter.status = battleCharacter.status.filter(s => s.turnsRemaining > 0);
}