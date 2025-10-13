// components/PlayerPortal.jsx

import React, { useEffect, useState } from "react";

export default function PlayerPortal({ playerKey, playerData, onQueueAction, onQueueSpell, isReady }) {
  const name = playerData?.character?.name || "???";
  const { hp, mp, ap, position, status = [], queue = [] } = playerData || {};
  const actionEntries = Object.entries(playerData?.character?.actions || {});
  const spellEntries = Object.entries(playerData?.character?.spells || {});
  const defaultTab = actionEntries.length > 0 ? "actions" : "spells";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [playerData, defaultTab]);

  const renderActionButtons = () => (
    <div className="flex flex-wrap gap-2 w-full justify-center">
      {actionEntries.map(([key, action]) => (
        <button
          key={key}
          className="px-3 py-1 bg-indigo-500/80 hover:bg-indigo-400 text-slate-950 text-xs font-semibold rounded-full shadow-lg shadow-indigo-900/40 transition"
          onClick={() => onQueueAction(playerKey, action)}
        >
          {action.name}
        </button>
      ))}
    </div>
  );

  const renderSpellButtons = () => (
    <div className="flex flex-wrap gap-2 w-full justify-center">
      {spellEntries.map(([key, spell]) => (
        <button
          key={key}
          className="px-3 py-1 bg-pink-500/80 hover:bg-pink-400 text-slate-950 text-xs font-semibold rounded-full shadow-lg shadow-pink-900/40 transition"
          onClick={() => onQueueSpell(playerKey, spell)}
        >
          {spell.name}
        </button>
      ))}
    </div>
  );

  const showTabs = actionEntries.length > 0 && spellEntries.length > 0;

  return (
    <div className="border border-white/10 rounded-2xl bg-slate-950/70 backdrop-blur p-5 space-y-5 flex flex-col shadow-xl shadow-slate-950/40">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border border-white/10 flex items-center justify-center text-xs text-slate-200">
            Avatar
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              {name}
            </h2>
            <p className="text-xs text-slate-400 uppercase tracking-wide">{playerKey}</p>
            <p className="text-xs text-slate-500 mt-1">Position {position}</p>
          </div>
        </div>

        <div className="text-sm space-y-1 text-slate-200">
          <p>❤️ <strong>HP:</strong> {hp}</p>
          <p>💧 <strong>MP:</strong> {mp}</p>
          <p>⚡ <strong>AP:</strong> {ap}</p>
        </div>
      </div>

      <div className="w-full">
        <h4 className="text-sm font-semibold mb-2 text-slate-200 uppercase tracking-wide">Queued Actions</h4>
        <ul className="flex flex-wrap gap-2">
          {queue.length > 0 ? queue.map((q, idx) => (
            <li key={idx} className="bg-indigo-500/20 border border-indigo-400/40 text-indigo-100 px-2 py-1 text-xs rounded-full shadow">{q.name}</li>
          )) : <li className="text-xs text-slate-500">No actions queued</li>}
        </ul>
      </div>

      <div className="text-sm w-full text-slate-200">
        <p>📛 <strong>Status:</strong> {status.length > 0 ? status.map((s, i) => (
          <span key={`${s.name}-${i}`} className="inline-block bg-amber-400/20 text-amber-200 text-xs px-2 py-0.5 rounded-full mr-1 border border-amber-200/30">{s.name}</span>
        )) : <span className="text-slate-500">None</span>}</p>
      </div>

      {!isReady && (actionEntries.length > 0 || spellEntries.length > 0) && (
        <div className="w-full space-y-3">
          {showTabs ? (
            <div className="flex justify-center gap-2 text-xs font-semibold uppercase tracking-wide">
              <button
                onClick={() => setActiveTab("actions")}
                className={`px-3 py-1 rounded-full transition ${
                  activeTab === "actions"
                    ? "bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-900/40"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                Actions
              </button>
              <button
                onClick={() => setActiveTab("spells")}
                className={`px-3 py-1 rounded-full transition ${
                  activeTab === "spells"
                    ? "bg-pink-500 text-slate-950 shadow-lg shadow-pink-900/40"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                Spells
              </button>
            </div>
          ) : (
            <div className="text-xs text-center text-slate-400 uppercase tracking-wide">
              {actionEntries.length > 0 ? "Actions" : "Spells"}
            </div>
          )}

          {activeTab === "actions" && actionEntries.length > 0 && renderActionButtons()}
          {activeTab === "spells" && spellEntries.length > 0 && renderSpellButtons()}
          {activeTab === "actions" && actionEntries.length === 0 && renderSpellButtons()}
          {activeTab === "spells" && spellEntries.length === 0 && renderActionButtons()}
        </div>
      )}
    </div>
  );
}
