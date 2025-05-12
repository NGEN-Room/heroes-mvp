// engine/main.js

import { spawnCharacter } from "./battleState.js";
import { runTurn } from "./turnEngine.js";
import { resolveStatuses } from "./statusWatch.js";
import { summarizeRound } from "./roundSummary.js";
import { battleLog } from "./battleLog.js";

export function setupMatch(player1Template, player2Template) {
  const player1 = spawnCharacter(player1Template, 0);
  const player2 = spawnCharacter(player2Template, 5);

  return {
    player1,
    player2,
    round: 1,
    history: [],
    logs: [],
    flavour: []
  };
}

export function runRound(state) {
  const { player1, player2, history, round } = state;

  const log = [`🔁 Round ${round}`];

  resolveStatuses(player1);
  resolveStatuses(player2);

  runTurn(state);

  const summary = summarizeRound(state);
  summary.forEach(msg => battleLog(state, msg));
  history.push(summary);

  state.round += 1;

  const winner = checkWinner(state);
  if (winner) battleLog(state, `🏆 ${winner} wins the match!`);

  return {
    log: summary,
    winner
  };
}

export function checkWinner(state) {
  const { player1, player2 } = state;

  if (player1.hp <= 0 && player2.hp <= 0) return "Draw";
  if (player1.hp <= 0) return player2.character.name;
  if (player2.hp <= 0) return player1.character.name;
  return null;
}

export function flavourLog(state, message) {
  if (!state.flavour) {
    state.flavour = [];
  }
  console.log("🎭", message);
  state.flavour.push(message);
}
