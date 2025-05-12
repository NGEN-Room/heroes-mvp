export function runTurn(player1, player2) {
  const allActions = [
    ...player1.queue.map(action => ({ owner: player1, target: player2, ...action })),
    ...player2.queue.map(action => ({ owner: player2, target: player1, ...action }))
  ];

  allActions.sort((a, b) => {
    const aSpeed = a.owner.modifiedStats.speed + (a.speed || 0);
    const bSpeed = b.owner.modifiedStats.speed + (b.speed || 0);
    return bSpeed - aSpeed;
  });

  for (const action of allActions) {
    const { owner, target, cost = 0, mpCost = 0, effect } = action;
    if (owner.ap >= cost && owner.mp >= mpCost && typeof effect === 'function') {
      owner.ap -= cost;
      owner.mp -= mpCost;
      effect(owner, target);
    }
  }

  regenerateResources(player1);
  regenerateResources(player2);

  player1.queue = [];
  player2.queue = [];
}

function regenerateResources(player) {
  player.ap = Math.min(player.ap + 1, player.modifiedStats.ap);
  player.mp += Math.floor(player.character.rawStats.brains * 0.25);
}