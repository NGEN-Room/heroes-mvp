export function summarizeRound(state) {
  const statusLines = [];
  const { player1, player2, round } = state;

  [player1, player2].forEach(player => {
    if (player.status.length > 0) {
      player.status.forEach(s => {
        statusLines.push(`${player.character.name} suffers from ${s.name}`);
      });
    }
  });

  return [`🌀 Round ${round}`, ...statusLines];
}