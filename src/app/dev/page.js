// app/dev/page.js
"use client";
import { useEffect, useState } from "react";
import thornTemplate from "@/data/heroes/Thorn/export.js";
import kaiaTemplate from "@/data/heroes/Kaia/export.js";
import { spawnCharacter } from "@/engine/battleState.js";
import { runTurn } from "@/engine/turnEngine.js";

export default function DevPage() {
  const [thorn, setThorn] = useState(null);
  const [kaia, setKaia] = useState(null);
  const [log, setLog] = useState([]);
  const [readyThorn, setReadyThorn] = useState(false);
  const [readyKaia, setReadyKaia] = useState(false);

  const [thornQueue, setThornQueue] = useState([]);
  const [kaiaQueue, setKaiaQueue] = useState([]);

  useEffect(() => {
    const t = spawnCharacter(thornTemplate, 0);
    const k = spawnCharacter(kaiaTemplate, 5);
    setThorn(t);
    setKaia(k);
  }, []);

  function queueAction(player, actionName) {
    if (player === 'thorn') {
      const action = thorn.character.actions[actionName] || thorn.character.spells[actionName];
      if (action) setThornQueue(prev => [...prev, action]);
    } else if (player === 'kaia') {
      const action = kaia.character.actions[actionName] || kaia.character.spells[actionName];
      if (action) setKaiaQueue(prev => [...prev, action]);
    }
  }

  function runBattleTurn() {
    if (!readyThorn || !readyKaia) return;

    thorn.queue = [...thornQueue];
    kaia.queue = [...kaiaQueue];

    const turnLog = [];
    const originalLog = console.log;
    console.log = (...args) => {
      turnLog.push(args.join(" "));
      originalLog(...args);
    };

    runTurn(thorn, kaia);

    console.log = originalLog;

    setThorn({ ...thorn });
    setKaia({ ...kaia });
    setLog(prev => [...prev, "--- New Turn ---", ...turnLog]);
    setThornQueue([]);
    setKaiaQueue([]);
    setReadyThorn(false);
    setReadyKaia(false);
  }

  useEffect(() => {
    if (readyThorn && readyKaia) {
      runBattleTurn();
    }
  }, [readyThorn, readyKaia]);

  return (
    <div className="p-6 font-mono text-sm space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">⚔️ Heroes Banquet - Turn Simulation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {thorn && (
          <div className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-bold text-red-700">🛡 Thorn</h2>
            <ul className="mt-2 space-y-1">
              <li>❤️ HP: {thorn.hp}</li>
              <li>🔵 MP: {thorn.mp}</li>
              <li>💥 AP: {thorn.ap}</li>
            </ul>
            <h3 className="mt-4 font-semibold">Actions</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.keys(thorn.character.actions).map((actionKey) => (
                <button
                  key={actionKey}
                  onClick={() => queueAction('thorn', actionKey)}
                  className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                >
                  {thorn.character.actions[actionKey].name}
                </button>
              ))}
              {Object.keys(thorn.character.spells).map((spellKey) => (
                <button
                  key={spellKey}
                  onClick={() => queueAction('thorn', spellKey)}
                  className="px-2 py-1 bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                >
                  {thorn.character.spells[spellKey].name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setReadyThorn(true)}
              className="mt-3 bg-red-600 text-white px-3 py-1 rounded"
            >
              ✅ Ready
            </button>
          </div>
        )}

        {kaia && (
          <div className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-bold text-purple-700">🧙 Kaia</h2>
            <ul className="mt-2 space-y-1">
              <li>❤️ HP: {kaia.hp}</li>
              <li>🔵 MP: {kaia.mp}</li>
              <li>💥 AP: {kaia.ap}</li>
            </ul>
            <h3 className="mt-4 font-semibold">Actions</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.keys(kaia.character.actions).map((actionKey) => (
                <button
                  key={actionKey}
                  onClick={() => queueAction('kaia', actionKey)}
                  className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                >
                  {kaia.character.actions[actionKey].name}
                </button>
              ))}
              {Object.keys(kaia.character.spells).map((spellKey) => (
                <button
                  key={spellKey}
                  onClick={() => queueAction('kaia', spellKey)}
                  className="px-2 py-1 bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                >
                  {kaia.character.spells[spellKey].name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setReadyKaia(true)}
              className="mt-3 bg-purple-600 text-white px-3 py-1 rounded"
            >
              ✅ Ready
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-md font-bold mb-2">📜 Turn Log</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-800">
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
