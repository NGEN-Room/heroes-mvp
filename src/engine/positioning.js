// engine/positioning.js
//
// Simple one-dimensional battlefield helpers. The grid is represented as
// contiguous integer slots; player1 starts at the low end, player2 at the high end.

import { battleLog } from "./battleLog.js";

export const GRID_LIMITS = {
  min: 0,
  max: 5
};

export function clampPosition(value) {
  return Math.max(GRID_LIMITS.min, Math.min(GRID_LIMITS.max, value));
}

export function getDistance(entityA, entityB) {
  const posA = entityA?.position ?? GRID_LIMITS.min;
  const posB = entityB?.position ?? GRID_LIMITS.min;
  return Math.abs(posA - posB);
}

export function moveBy(actor, delta, state, intent = null) {
  if (!actor) return false;

  const prev = actor.position ?? GRID_LIMITS.min;
  const next = clampPosition(prev + delta);

  if (next === prev) {
    if (state) {
      const direction = intent ?? (delta > 0 ? "forward" : "back");
      battleLog(state, `${actor.character?.name ?? "Unknown"} cannot move further ${direction}.`);
    }
    return false;
  }

  actor.position = next;

  if (state) {
    const direction = intent ?? (delta > 0 ? "forward" : "back");
    battleLog(state, `${actor.character?.name ?? "Unknown"} moves ${direction} to position ${next}.`);
  }

  return true;
}

export function moveForward(actor, state, amount = 1) {
  if (!state) return moveBy(actor, amount, state, "forward");
  const direction = actor === state.player1 ? 1 : -1;
  return moveBy(actor, direction * amount, state, "forward");
}

export function moveBackward(actor, state, amount = 1) {
  if (!state) return moveBy(actor, -amount, state, "back");
  const direction = actor === state.player1 ? -1 : 1;
  return moveBy(actor, direction * amount, state, "back");
}

export function withinRange({ range, minRange }, owner, target) {
  if (range === undefined || range === null) {
    return true;
  }

  const maxRange = typeof range === "string" ? interpretRangeKeyword(range) : Number(range);
  const min = typeof minRange === "number" ? minRange : 0;

  if (!Number.isFinite(maxRange)) {
    return true;
  }

  const distance = getDistance(owner, target);
  return distance >= min && distance <= maxRange;
}

function interpretRangeKeyword(keyword) {
  switch (keyword) {
    case "melee":
    case "adjacent":
      return 1;
    case "reach":
      return 2;
    case "ranged":
      return 4;
    case "global":
    case "infinite":
      return Infinity;
    default:
      return Number.NaN;
  }
}

export const coreMovementActions = {
  advance: {
    name: "Advance",
    cost: 1,
    speed: 5,
    tags: ["movement"],
    effect: (self, _target, state) => {
      moveForward(self, state);
    }
  },
  retreat: {
    name: "Retreat",
    cost: 1,
    speed: 5,
    tags: ["movement"],
    effect: (self, _target, state) => {
      moveBackward(self, state);
    }
  }
};
