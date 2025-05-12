import { applyModifiers } from "./statModifiers.js";

export function spawnCharacter(template, startingPosition) {
  const modifiedTemplate = applyModifiers(template);

  return {
    character: template,
    modifiedStats: modifiedTemplate.modifiedStats,
    hp: modifiedTemplate.modifiedStats.hp,
    mp: modifiedTemplate.modifiedStats.mp,
    ap: modifiedTemplate.modifiedStats.ap,
    position: startingPosition,
    status: [],
    queue: []
  };
}