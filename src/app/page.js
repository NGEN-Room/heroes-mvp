// app/page.js

"use client";

import { useEffect, useState } from "react";
import { setupMatch, runRound, checkWinner } from "@/engine/main.js";
import { heroRoster } from "@/engine/heroRegistry.js";
import PlayerPortal from "@/components/PlayerPortal";

export default function GamePage() {
  const [match, setMatch] = useState(null);
  const [heroNames, setHeroNames] = useState(Object.keys(heroRoster));
  const [selected, setSelected] = useState({ player1: "Thorn", player2: "Kaia" });
  const [winner, setWinner] = useState(null);
  const [stage, setStage] = useState("selection");
  const [logView, setLogView] = useState("battle");

  async function handleConfirmMatch() {
    const hero1 = await heroRoster[selected.player1]();
    const hero2 = await heroRoster[selected.player2]();
    const newMatch = setupMatch(hero1.default, hero2.default);
    setMatch(newMatch);
    setWinner(null);
    setStage("match");
  }

  function handleStartRound() {
    if (!match) return;
    const newState = { ...match };
    const result = runRound(newState);
    const win = checkWinner(newState);
    setMatch(newState);
    setWinner(win);
  }

  function handleQueueAction(playerKey, actionObj) {
    if (!match) return;
    const newState = { ...match };
    newState[playerKey].queue.push(actionObj);
    setMatch(newState);
  }

  function handleQueueSpell(playerKey, spellObj) {
    if (!match) return;
    const newState = { ...match };
    newState[playerKey].queue.push(spellObj);
    setMatch(newState);
  }

  function handleResetMatch() {
    setStage("selection");
    setMatch(null);
    setWinner(null);
  }

  if (stage === "selection") {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">⚔️ Select Your Heroes</h1>

        <div className="grid grid-cols-2 gap-4">
          {['player1', 'player2'].map((player) => (
            <div key={player} className="space-y-2">
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
            </div>
          ))}
        </div>

        <button
          onClick={handleConfirmMatch}
          className="px-6 py-2 bg-purple-700 text-white rounded"
        >
          Confirm Match
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">⚔️ Heroes Banquet: MVP</h1>

      {winner && (
        <div className="p-4 bg-yellow-300 border border-yellow-600 rounded text-center font-bold text-lg">
          🏆 {winner === "Draw" ? "It's a draw!" : `${winner} wins the match!`}
        </div>
      )}

      {/* Player Portals */}
      <div className="grid grid-cols-2 gap-4">
        {['player1', 'player2'].map((playerKey) => (
          <PlayerPortal
            key={playerKey}
            playerKey={playerKey}
            playerData={match?.[playerKey]}
            onQueueAction={handleQueueAction}
            onQueueSpell={handleQueueSpell}
            isReady={false}
          />
        ))}
      </div>

      {/* Round Controls */}
      <div className="flex gap-4">
        <button
          onClick={handleStartRound}
          className="px-6 py-2 bg-green-700 text-white rounded"
        >
          Start Round
        </button>

        <button
          onClick={handleResetMatch}
          className="px-6 py-2 bg-gray-700 text-white rounded"
        >
          Reset Match
        </button>
      </div>

      {/* Log Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setLogView("battle")}
          className={`px-4 py-1 text-sm rounded ${logView === "battle" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Battle Log
        </button>
        <button
          onClick={() => setLogView("flavour")}
          className={`px-4 py-1 text-sm rounded ${logView === "flavour" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
        >
          Flavour
        </button>
      </div>

      {/* Log Output */}
      <div className="bg-gray-100 border rounded p-4 text-sm h-60 overflow-y-scroll">
        {(logView === "battle" ? match?.logs : match?.flavour)?.slice().reverse().map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
}
