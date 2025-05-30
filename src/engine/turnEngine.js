// engine/turnEngine.js

import { battleLog } from "./battleLog.js";

export function runTurn(state) {
  try {
    const player1 = state?.player1 || { queue: [], modifiedStats: {}, character: {}, ap: 0, mp: 0 };
    const player2 = state?.player2 || { queue: [], modifiedStats: {}, character: {}, ap: 0, mp: 0 };

    const maxLength = Math.max(player1.queue.length, player2.queue.length);
    const allActions = [];

    for (let i = 0; i < maxLength; i++) {
      if (player1.queue[i]) allActions.push({ owner: player1, target: player2, ...player1.queue[i] });
      if (player2.queue[i]) allActions.push({ owner: player2, target: player1, ...player2.queue[i] });
    }

    allActions.sort((a, b) => {
      const aSpeed = a.owner.modifiedStats.speed + (a.speed || 0);
      const bSpeed = b.owner.modifiedStats.speed + (b.speed || 0);
      return bSpeed - aSpeed;
    });

    for (const action of allActions) {
      const { owner, target, apCost = 0, mpCost = 0, effect, name, alignment } = action;

      if (owner.ap >= apCost && owner.mp >= mpCost && typeof effect === 'function') {
        const prevHp = target.hp;

        owner.ap -= apCost;
        owner.mp -= mpCost;

        effect(owner, target, state);

        let dmg = prevHp - target.hp;

        if (dmg > 0 && alignment && owner.modifiedStats[alignment] !== undefined) {
          const boost = owner.modifiedStats[alignment];
          target.hp -= boost;
          dmg += boost;
        }

        if (name && state?.logs && dmg > 0) {
          battleLog(state, `${owner.character.name} uses ${name} for ${dmg} dmg`);
        } else if (name && state?.logs) {
          battleLog(state, `${owner.character.name} uses ${name}`);
        }
      }
    }

    regenerateResources(player1);
    regenerateResources(player2);

    player1.queue = [];
    player2.queue = [];
  } catch (err) {
    console.warn("⚠️ runTurn error:", err);
  }
}


function regenerateResources(player) {
  // Regenerate AP up to their max
  player.ap = Math.min(player.ap + 1, player.modifiedStats.ap);

  // MP regen scaled by brain
  const regenAmount = Math.floor(player.character.rawStats.brain * 0.2);
  player.mp = Math.min(player.mp + regenAmount, player.modifiedStats.mp);
}