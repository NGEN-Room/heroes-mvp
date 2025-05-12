// app/page.js

"use client";

import { useEffect, useState } from "react";
import { setupMatch, runRound, markReady, canStartRound, checkWinner } from "@/engine/main.js";
import { heroRoster } from "@/engine/heroRegistry.js";
import PlayerPortal from "@/components/PlayerPortal";

export default function GamePage() {
  const [match, setMatch] = useState(null);
  const [heroNames, setHeroNames] = useState(Object.keys(heroRoster));
  const [selected, setSelected] = useState({ player1: "Thorn", player2: "Kaia" });
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    loadHeroes();
  }, []);

  async function loadHeroes() {
    const hero1 = await heroRoster[selected.player1]();
    const hero2 = await heroRoster[selected.player2]();
    const newMatch = setupMatch(hero1.default, hero2.default);
    setMatch(newMatch);
    setWinner(null);
  }

  function handleReady(player) {
    if (!match) return;
    const newState = { ...match };
    markReady(newState, player);
    setMatch(newState);
  }

  function handleStartRound() {
    if (!match || !canStartRound(match)) return;
    const newState = { ...match };
    const result = runRound(newState);
    const win = checkWinner(newState);
    setMatch(newState);
    setWinner(win);
  }

  function handleQueueAction(playerKey, actionObj) {
    if (!match || match.isReady[playerKey]) return;
    const newState = { ...match };
    newState[playerKey].queue.push(actionObj);
    setMatch(newState);
  }

  function handleQueueSpell(playerKey, spellObj) {
    if (!match || match.isReady[playerKey]) return;
    const newState = { ...match };
    newState[playerKey].queue.push(spellObj);
    setMatch(newState);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">⚔️ Heroes Banquet: MVP</h1>

      {winner && (
        <div className="p-4 bg-yellow-300 border border-yellow-600 rounded text-center font-bold text-lg">
          🏆 {winner === "Draw" ? "It's a draw!" : `${winner} wins the match!`}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* Hero Selectors */}
        {['player1', 'player2'].map((player) => (
          <div key={player}>
            <label className="block mb-1 font-semibold">{player}</label>
            <select
              value={selected[player]}
              onChange={(e) => setSelected({ ...selected, [player]: e.target.value })}
              className="w-full border rounded px-2 py-1"
            >
              {heroNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <button
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
              onClick={() => handleReady(player)}
            >
              Ready
            </button>
          </div>
        ))}
      </div>

      {/* Player Portals */}
      <div className="grid grid-cols-2 gap-4">
        {['player1', 'player2'].map((playerKey) => (
          <PlayerPortal
            key={playerKey}
            playerKey={playerKey}
            playerData={match?.[playerKey]}
            onQueueAction={handleQueueAction}
            onQueueSpell={handleQueueSpell}
            isReady={match?.isReady?.[playerKey]}
          />
        ))}
      </div>

      {/* Round Controls */}
      <div>
        <button
          onClick={handleStartRound}
          disabled={!match || !canStartRound(match)}
          className="px-6 py-2 bg-green-700 text-white rounded disabled:opacity-40"
        >
          Start Round
        </button>
      </div>

      {/* Battle Log */}
      <div className="bg-gray-100 border rounded p-4 text-sm h-60 overflow-y-scroll">
        {match?.logs?.slice().reverse().map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
}
