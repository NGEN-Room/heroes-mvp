// engine/roundSummary.js

export function summarizeRound(state) {
  const lines = [];
  const { player1, player2, round } = state;

  lines.push(`🌀 Round ${round}`);

  [player1, player2].forEach(player => {
    if (player.status.length > 0) {
      player.status.forEach(s => {
        lines.push(`🔥 ${player.character.name} suffers from ${s.name}`);
      });
    }
  });

  return lines;
}
