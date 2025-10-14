// engine/turnEngine.js

import { battleLog } from "./battleLog.js";
import { withinRange } from "./positioning.js";
import { dealDamage } from "./combatUtils.js";

export function runTurn(state) {
  try {
    const player1 = state?.player1 || { queue: [], modifiedStats: {}, character: {}, ap: 0, mp: 0 };
    const player2 = state?.player2 || { queue: [], modifiedStats: {}, character: {}, ap: 0, mp: 0 };

    player1.state = state;
    player2.state = state;

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
      const {
        owner,
        target,
        effect,
        name,
        alignment,
        apCost,
        cost,
        mpCost = 0
      } = action;

      const resolvedApCost = apCost ?? cost ?? 0;
      const resolvedMpCost = mpCost ?? 0;

      if (typeof effect !== "function") {
        continue;
      }

      if (!withinRange(action, owner, target)) {
        if (state?.logs) {
          const label = name ?? "action";
          battleLog(state, `${owner.character.name}'s ${label} fails — target out of range.`);
        }
        continue;
      }

      if (owner.ap >= resolvedApCost && owner.mp >= resolvedMpCost) {
        const prevHp = target.hp;
        const prevShield = target.shield ?? 0;

        owner.ap -= resolvedApCost;
        owner.mp -= resolvedMpCost;

        effect(owner, target, state);

        const hpLoss = Math.max(0, prevHp - target.hp);
        const shieldLoss = Math.max(0, prevShield - (target.shield ?? 0));
        let dmg = hpLoss + shieldLoss;
        const baseDamage = dmg;

        if (baseDamage > 0 && alignment && owner.modifiedStats[alignment] !== undefined) {
          const boost = owner.modifiedStats[alignment];
          if (boost > 0) {
            const alignmentResult = dealDamage(target, boost, state, name);
            dmg += alignmentResult.hp + alignmentResult.shield;
          }
        }

        if (name && state?.logs && dmg > 0) {
          battleLog(state, `${owner.character.name} uses ${name} for ${dmg} dmg`);
        } else if (name && state?.logs) {
          battleLog(state, `${owner.character.name} uses ${name}`);
        }
      } else if (state?.logs) {
        const label = name ?? "action";
        battleLog(state, `${owner.character.name} cannot afford ${label}.`);
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
