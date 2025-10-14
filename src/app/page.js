// app/page.js

"use client";

import { useEffect, useState } from "react";
import { setupMatch, runRound, checkWinner } from "@/engine/main.js";
import { heroRoster } from "@/engine/heroRegistry.js";
import PlayerPortal from "@/components/PlayerPortal";
import BattlefieldLane from "@/components/BattlefieldLane";

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

  function updateQueue(playerKey, updater) {
    if (!match) return;
    const player = match[playerKey];
    if (!player) return;
    const currentQueue = Array.isArray(player.queue) ? player.queue : [];
    const nextQueue = updater(currentQueue);
    if (!Array.isArray(nextQueue)) return;

    const newState = {
      ...match,
      [playerKey]: {
        ...player,
        queue: nextQueue
      }
    };

    setMatch(newState);
  }

  function handleQueueAction(playerKey, actionObj) {
    if (!match) return;
    updateQueue(playerKey, (queue) => [...queue, actionObj]);
  }

  function handleQueueSpell(playerKey, spellObj) {
    if (!match) return;
    updateQueue(playerKey, (queue) => [...queue, spellObj]);
  }

  function handleRemoveQueued(playerKey, index) {
    updateQueue(playerKey, (queue) => queue.filter((_, idx) => idx !== index));
  }

  function handleMoveQueued(playerKey, fromIndex, direction) {
    updateQueue(playerKey, (queue) => {
      const newQueue = [...queue];
      if (fromIndex < 0 || fromIndex >= newQueue.length) return newQueue;
      const targetIndex = fromIndex + direction;
      if (targetIndex < 0 || targetIndex >= newQueue.length) return newQueue;
      const [item] = newQueue.splice(fromIndex, 1);
      newQueue.splice(targetIndex, 0, item);
      return newQueue;
    });
  }

  function handleResetMatch() {
    setStage("selection");
    setMatch(null);
    setWinner(null);
  }

  if (stage === "selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
        <div className="max-w-3xl mx-auto py-12 px-6 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur">
            <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">⚔️ Heroes Banquet</h1>
            <p className="text-sm text-slate-300 text-center mb-8">Select two heroes to enter the arena.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['player1', 'player2'].map((player, idx) => (
                <div key={player} className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wide">
                    {player} {idx === 0 ? "— Attacker" : "— Defender"}
                  </label>
                  <select
                    value={selected[player]}
                    onChange={(e) => setSelected({ ...selected, [player]: e.target.value })}
                    className="w-full border border-white/10 rounded-lg bg-slate-950/70 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
              className="mt-10 w-full md:w-auto md:px-8 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-full shadow-lg shadow-indigo-900/40 transition"
            >
              Enter the Arena
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto py-12 px-6 space-y-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">⚔️ Heroes Banquet: MVP</h1>
            <p className="text-sm text-slate-300">Queue abilities, control your positioning, and outplay your rival.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleStartRound}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-full shadow-lg shadow-emerald-900/40 transition"
            >
              Start Round
            </button>
            <button
              onClick={handleResetMatch}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-full shadow-lg shadow-slate-950/50 transition"
            >
              Reset Match
            </button>
          </div>
        </header>

        {winner && (
          <div className="p-4 bg-amber-400/20 border border-amber-300/40 rounded-xl text-center font-semibold text-lg text-amber-200 shadow-lg shadow-amber-900/30">
            🏆 {winner === "Draw" ? "It's a draw!" : `${winner} wins the match!`}
          </div>
        )}

        {match && (
          <BattlefieldLane
            grid={match.grid}
            player1={match.player1}
            player2={match.player2}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['player1', 'player2'].map((playerKey) => (
            <PlayerPortal
              key={playerKey}
              playerKey={playerKey}
              playerData={match?.[playerKey]}
              onQueueAction={handleQueueAction}
              onQueueSpell={handleQueueSpell}
              onRemoveQueued={handleRemoveQueued}
              onReorderQueued={handleMoveQueued}
              isReady={false}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setLogView("battle")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
              logView === "battle"
                ? "bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-900/40"
                : "bg-white/10 text-slate-200 hover:bg-white/20"
            }`}
          >
            Battle Log
          </button>
          <button
            onClick={() => setLogView("flavour")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
              logView === "flavour"
                ? "bg-pink-500 text-slate-950 shadow-lg shadow-pink-900/40"
                : "bg-white/10 text-slate-200 hover:bg-white/20"
            }`}
          >
            Flavour
          </button>
        </div>

        <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-4 text-sm h-64 overflow-y-scroll shadow-inner shadow-slate-950">
          {(logView === "battle" ? match?.logs : match?.flavour)?.slice().reverse().map((line, idx) => (
            <div key={idx} className="text-slate-200">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
