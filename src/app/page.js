"use client";

import { useEffect, useState } from "react";
import PlayerPortal from "@/components/PlayerPortal";
import BattlefieldLane from "@/components/BattlefieldLane";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const payload = await response.json();
      if (payload?.error) {
        message = payload.error;
      }
    } catch {}
    throw new Error(message);
  }

  return response.json();
}

export default function GamePage() {
  const [heroes, setHeroes] = useState([]);
  const [selected, setSelected] = useState({ player1: "thorn", player2: "kaia" });
  const [match, setMatch] = useState(null);
  const [winner, setWinner] = useState(null);
  const [stage, setStage] = useState("selection");
  const [logView, setLogView] = useState("battle");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [queues, setQueues] = useState({ player1: [], player2: [] });

  useEffect(() => {
    let cancelled = false;

    async function loadHeroes() {
      try {
        const payload = await apiFetch("/api/heroes");
        if (!cancelled) {
          setHeroes(payload.heroes || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      }
    }

    loadHeroes();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleConfirmMatch() {
    setLoading(true);
    setError(null);

    try {
      const payload = await apiFetch("/api/matches", {
        method: "POST",
        body: JSON.stringify({
          player1HeroId: selected.player1,
          player2HeroId: selected.player2,
        }),
      });

      setMatch(payload);
      setWinner(payload.winner);
      setQueues({ player1: [], player2: [] });
      setStage("match");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStartRound() {
    if (!match?.matchId) return;

    setLoading(true);
    setError(null);

    try {
      const payload = await apiFetch(`/api/matches/${match.matchId}/round`, {
        method: "POST",
        body: JSON.stringify({
          player1Queue: queues.player1,
          player2Queue: queues.player2,
        }),
      });

      setMatch(payload);
      setWinner(payload.winner);
      setQueues({ player1: [], player2: [] });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function updateQueue(playerKey, updater) {
    setQueues((current) => {
      const nextQueue = updater(current[playerKey] || []);
      return { ...current, [playerKey]: nextQueue };
    });
  }

  function handleQueueAbility(playerKey, abilityId) {
    updateQueue(playerKey, (queue) => [...queue, abilityId]);
  }

  function handleRemoveQueued(playerKey, index) {
    updateQueue(playerKey, (queue) => queue.filter((_, idx) => idx !== index));
  }

  function handleMoveQueued(playerKey, fromIndex, direction) {
    updateQueue(playerKey, (queue) => {
      const nextQueue = [...queue];
      const targetIndex = fromIndex + direction;

      if (fromIndex < 0 || fromIndex >= nextQueue.length) return nextQueue;
      if (targetIndex < 0 || targetIndex >= nextQueue.length) return nextQueue;

      const [item] = nextQueue.splice(fromIndex, 1);
      nextQueue.splice(targetIndex, 0, item);
      return nextQueue;
    });
  }

  function handleResetMatch() {
    setStage("selection");
    setMatch(null);
    setWinner(null);
    setError(null);
    setQueues({ player1: [], player2: [] });
  }

  const heroOptions = heroes.length > 0
    ? heroes
    : [
        { id: "thorn", name: "Thorn" },
        { id: "kaia", name: "Kaia" },
      ];

  if (stage === "selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
        <div className="max-w-3xl mx-auto py-12 px-6 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur">
            <h1 className="text-3xl font-bold tracking-tight mb-3 text-center">Heroes Banquet</h1>
            <p className="text-sm text-slate-300 text-center mb-8">
              Next.js now handles the frontend only. Match logic runs in the Python backend.
            </p>

            {error && (
              <div className="mb-6 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["player1", "player2"].map((player, idx) => (
                <div key={player} className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wide">
                    {player} {idx === 0 ? "- Attacker" : "- Defender"}
                  </label>
                  <select
                    value={selected[player]}
                    onChange={(event) => setSelected((current) => ({ ...current, [player]: event.target.value }))}
                    className="w-full border border-white/10 rounded-lg bg-slate-950/70 text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    {heroOptions.map((hero) => (
                      <option key={hero.id} value={hero.id}>
                        {hero.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button
              onClick={handleConfirmMatch}
              disabled={loading}
              className="mt-10 w-full md:w-auto md:px-8 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-semibold rounded-full shadow-lg shadow-indigo-900/40 transition"
            >
              {loading ? "Creating Match..." : "Enter the Arena"}
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
            <h1 className="text-3xl font-bold tracking-tight">Heroes Banquet</h1>
            <p className="text-sm text-slate-300">Queue abilities in the frontend and resolve each round in Python.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleStartRound}
              disabled={loading}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-semibold rounded-full shadow-lg shadow-emerald-900/40 transition"
            >
              {loading ? "Resolving..." : "Start Round"}
            </button>
            <button
              onClick={handleResetMatch}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-full shadow-lg shadow-slate-950/50 transition"
            >
              Reset Match
            </button>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        )}

        {winner && (
          <div className="p-4 bg-amber-400/20 border border-amber-300/40 rounded-xl text-center font-semibold text-lg text-amber-200 shadow-lg shadow-amber-900/30">
            {winner === "Draw" ? "It's a draw!" : `${winner} wins the match!`}
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
          {["player1", "player2"].map((playerKey) => (
            <PlayerPortal
              key={playerKey}
              playerKey={playerKey}
              playerData={match?.[playerKey]}
              queuedAbilityIds={queues[playerKey]}
              onQueueAbility={handleQueueAbility}
              onRemoveQueued={handleRemoveQueued}
              onReorderQueued={handleMoveQueued}
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
