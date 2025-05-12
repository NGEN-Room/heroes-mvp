export function battleLog(state, message) {
  console.log(message);
  if (!state.logs) {
    state.logs = [];
  }
  state.logs.push(message);
}