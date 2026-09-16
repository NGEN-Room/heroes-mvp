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
    // A hero chooses one ability per round; selecting another replaces it.
    updateQueue(playerKey, () => [abilityId]);
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
      <div className="game-shell">
        <div className="max-w-3xl mx-auto py-12 px-6 space-y-8">
          <div className="game-panel rounded-3xl p-8 sm:p-12">
            <p className="text-center text-xs text-amber-300/70 uppercase tracking-[0.35em] mb-3">The arena calls</p>
            <h1 className="font-serif text-5xl font-bold tracking-tight mb-3 text-center text-amber-100">Heroes Banquet</h1>
            <p className="text-sm text-amber-50/65 text-center mb-8">Choose two heroes. Each round brings one decisive choice.</p>

            {error && (
              <div className="mb-6 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["player1", "player2"].map((player, idx) => (
                <div key={player} className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wide">
                    {idx === 0 ? "West challenger" : "East challenger"}
                  </label>
                  <select
                    value={selected[player]}
                    onChange={(event) => setSelected((current) => ({ ...current, [player]: event.target.value }))}
                    className="w-full border border-amber-100/20 rounded-lg bg-black/30 text-amber-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
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
              className="mt-10 w-full md:w-auto md:px-8 px-6 py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-amber-950 font-bold rounded-full shadow-lg shadow-amber-950/40 transition"
            >
              {loading ? "Creating Match..." : "Enter the Arena"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-shell">
      <div className="max-w-6xl mx-auto py-12 px-6 space-y-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-amber-300/60 uppercase tracking-[0.25em]">Round {match?.round ?? 1}</p>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-amber-100">Heroes Banquet</h1>
            <p className="text-sm text-amber-50/60">Choose one ability each, then let the round unfold.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleStartRound}
              disabled={loading}
              className="px-6 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-amber-950 font-bold rounded-full shadow-lg shadow-amber-950/40 transition"
            >
              {loading ? "Resolving..." : "Start Round"}
            </button>
            <button
              onClick={handleResetMatch}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-amber-50 font-semibold rounded-full border border-amber-100/15 transition"
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
          <div className="p-4 bg-amber-400/20 border border-amber-300/40 rounded-xl text-center font-semibold text-lg text-amber-100 shadow-lg shadow-amber-900/30">
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
                ? "bg-amber-400 text-amber-950 shadow-lg shadow-amber-950/40"
                : "bg-white/10 text-amber-100 hover:bg-white/20"
            }`}
          >
            Battle Log
          </button>
          <button
            onClick={() => setLogView("flavour")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition ${
              logView === "flavour"
                ? "bg-violet-400 text-violet-950 shadow-lg shadow-violet-950/40"
                : "bg-white/10 text-amber-100 hover:bg-white/20"
            }`}
          >
            Flavour
          </button>
        </div>

        <div className="game-panel rounded-2xl p-4 text-sm h-64 overflow-y-scroll">
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
