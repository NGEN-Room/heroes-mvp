import React, { useEffect, useMemo, useState } from "react";

function formatCost(ability) {
  const apCost = ability.apCost ?? ability.cost ?? 0;
  const mpCost = ability.mpCost ?? 0;
  const parts = [];

  if (apCost > 0) parts.push(`${apCost} AP`);
  if (mpCost > 0) parts.push(`${mpCost} MP`);

  return parts.length > 0 ? parts.join(" • ") : "Free";
}

export default function PlayerPortal({
  playerKey,
  playerData,
  queuedAbilityIds,
  onQueueAbility,
  onRemoveQueued,
  onReorderQueued,
}) {
  const name = playerData?.character?.name || "???";
  const { hp, mp, ap, position, shield = 0, status = [] } = playerData || {};
  const actionEntries = playerData?.availableActions || [];
  const spellEntries = playerData?.availableSpells || [];
  const defaultTab = actionEntries.length > 0 ? "actions" : "spells";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [playerData, defaultTab]);

  const abilityLookup = useMemo(() => {
    return new Map([...actionEntries, ...spellEntries].map((ability) => [ability.id, ability]));
  }, [actionEntries, spellEntries]);

  const queue = (queuedAbilityIds || []).map((abilityId) => abilityLookup.get(abilityId)).filter(Boolean);
  const showTabs = actionEntries.length > 0 && spellEntries.length > 0;

  const renderAbilityButtons = (abilities, tone) => (
    <div className="flex flex-wrap gap-2 w-full justify-center">
      {abilities.map((ability) => (
        <button
          key={ability.id}
          className={`px-3 py-1 text-xs font-semibold rounded-full shadow-lg transition ${
            tone === "action"
              ? "bg-indigo-500/80 hover:bg-indigo-400 text-slate-950 shadow-indigo-900/40"
              : "bg-pink-500/80 hover:bg-pink-400 text-slate-950 shadow-pink-900/40"
          }`}
          onClick={() => onQueueAbility(playerKey, ability.id)}
        >
          {ability.name}
        </button>
      ))}
    </div>
  );

  return (
    <div className="border border-white/10 rounded-2xl bg-slate-950/70 backdrop-blur p-5 space-y-5 flex flex-col shadow-xl shadow-slate-950/40">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border border-white/10 flex items-center justify-center text-xs text-slate-200">
            {playerData?.heroId || "hero"}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">{name}</h2>
            <p className="text-xs text-slate-400 uppercase tracking-wide">{playerKey}</p>
            <p className="text-xs text-slate-500 mt-1">Position {position}</p>
          </div>
        </div>

        <div className="text-sm space-y-1 text-slate-200">
          <p>HP: <strong>{hp}</strong></p>
          <p>MP: <strong>{mp}</strong></p>
          <p>AP: <strong>{ap}</strong></p>
          <p>Shield: <strong>{shield}</strong></p>
        </div>
      </div>

      <div className="w-full">
        <h4 className="text-sm font-semibold mb-2 text-slate-200 uppercase tracking-wide">Queued Abilities</h4>
        {queue.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {queue.map((ability, idx) => (
              <li
                key={`${ability.id}-${idx}`}
                className="flex items-center justify-between gap-2 bg-indigo-500/10 border border-indigo-400/20 text-indigo-100 px-3 py-2 text-xs rounded-xl shadow"
              >
                <div>
                  <div className="font-semibold text-indigo-100">{ability.name}</div>
                  <div className="text-[11px] text-indigo-200/80">{formatCost(ability)}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() => onReorderQueued?.(playerKey, idx, -1)}
                    disabled={idx === 0}
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() => onReorderQueued?.(playerKey, idx, 1)}
                    disabled={idx === queue.length - 1}
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 rounded-full bg-rose-500/30 hover:bg-rose-500/50 text-rose-100 transition"
                    onClick={() => onRemoveQueued?.(playerKey, idx)}
                    aria-label="Remove"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-500">No abilities queued</p>
        )}
      </div>

      <div className="text-sm w-full text-slate-200">
        <p>
          Status:{" "}
          {status.length > 0 ? (
            status.map((entry, idx) => (
              <span
                key={`${entry.name}-${idx}`}
                className="inline-block bg-amber-400/20 text-amber-200 text-xs px-2 py-0.5 rounded-full mr-1 border border-amber-200/30"
              >
                {entry.name} ({entry.turnsRemaining})
              </span>
            ))
          ) : (
            <span className="text-slate-500">None</span>
          )}
        </p>
      </div>

      {(actionEntries.length > 0 || spellEntries.length > 0) && (
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

          {activeTab === "actions" && actionEntries.length > 0 && renderAbilityButtons(actionEntries, "action")}
          {activeTab === "spells" && spellEntries.length > 0 && renderAbilityButtons(spellEntries, "spell")}
          {activeTab === "actions" && actionEntries.length === 0 && renderAbilityButtons(spellEntries, "spell")}
          {activeTab === "spells" && spellEntries.length === 0 && renderAbilityButtons(actionEntries, "action")}
        </div>
      )}
    </div>
  );
}
