export function summarizeRound(state) {
  const { player1, player2 } = state;
  const summary = [];

  summary.push(`${player1.character.name} - HP: ${player1.hp}, AP: ${player1.ap}, MP: ${player1.mp}`);
  summary.push(`Status: ${player1.status.map(s => s.name).join(", ") || "None"}`);

  summary.push(`${player2.character.name} - HP: ${player2.hp}, AP: ${player2.ap}, MP: ${player2.mp}`);
  summary.push(`Status: ${player2.status.map(s => s.name).join(", ") || "None"}`);

  return summary;
}