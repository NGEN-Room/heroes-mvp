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
  const { hp, mp, ap, position, shield = 0, status = [], cooldowns = {} } = playerData || {};
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
  const maxStats = playerData?.modifiedStats || {};
  const heroInitial = name.charAt(0).toUpperCase();

  const resource = (label, value, maximum, tone) => (
    <div className="min-w-0">
      <div className="flex justify-between text-[0.65rem] uppercase tracking-[0.16em] text-amber-100/60 mb-1">
        <span>{label}</span><span>{value}/{maximum ?? value}</span>
      </div>
      <div className="resource-track">
        <div className={`resource-fill ${tone}`} style={{ width: `${Math.min(100, ((value || 0) / (maximum || 1)) * 100)}%` }} />
      </div>
    </div>
  );

  const renderAbilityButtons = (abilities, tone) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
      {abilities.map((ability) => (
        <button
          key={ability.id}
          disabled={(cooldowns[ability.id] || 0) > 0}
          className={`px-3 py-2.5 text-left text-xs font-semibold rounded-xl border shadow-lg transition disabled:opacity-45 disabled:cursor-not-allowed ${
            tone === "action"
              ? "bg-amber-500/15 hover:bg-amber-400/25 text-amber-50 border-amber-300/30 shadow-amber-950/20"
              : "bg-violet-500/15 hover:bg-violet-400/25 text-violet-50 border-violet-300/30 shadow-violet-950/20"
          }`}
          onClick={() => onQueueAbility(playerKey, ability.id)}
        >
          <span className="block">{ability.name}</span>
          <span className="block mt-1 text-[0.63rem] font-medium opacity-70 uppercase tracking-wider">
            {cooldowns[ability.id] > 0 ? `${cooldowns[ability.id]} round cooldown` : formatCost(ability)} · {ability.range ?? "self"} range
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="hero-card rounded-2xl p-5 space-y-5 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center text-3xl font-black shadow-inner ${playerKey === "player1" ? "bg-gradient-to-br from-amber-500 to-orange-800 border-amber-200/50 text-amber-950" : "bg-gradient-to-br from-violet-500 to-fuchsia-900 border-violet-200/50 text-violet-50"}`}>
            {heroInitial}
          </div>
          <div>
            <p className="text-[0.65rem] text-amber-200/60 uppercase tracking-[0.2em]">{playerKey === "player1" ? "West challenger" : "East challenger"}</p>
            <h2 className="text-xl font-bold text-amber-50">{name}</h2>
            <p className="text-xs text-amber-100/50 mt-1">Arena position {position}</p>
          </div>
        </div>

        <div className="w-full sm:w-48 space-y-2">
          {resource("Health", hp, maxStats.hp, "bg-rose-400")}
          {resource("Magic", mp, maxStats.mp, "bg-violet-400")}
          {resource("Action", ap, maxStats.ap, "bg-amber-400")}
          <p className="text-xs text-cyan-100/70">Shield <strong className="text-cyan-100">{shield}</strong></p>
        </div>
      </div>

      <div className="w-full">
        <h4 className="text-sm font-semibold mb-2 text-slate-200 uppercase tracking-wide">Chosen Ability</h4>
        {queue.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {queue.map((ability, idx) => (
              <li
                key={`${ability.id}-${idx}`}
                className="flex items-center justify-between gap-2 bg-amber-400/10 border border-amber-300/20 text-amber-50 px-3 py-2 text-xs rounded-xl shadow"
              >
                <div>
                  <div className="font-semibold text-amber-50">{ability.name}</div>
                  <div className="text-[11px] text-amber-100/60">{formatCost(ability)}</div>
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
          <p className="text-xs text-slate-500">Choose one ability for this round</p>
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
                {entry.name}{entry.stacks > 1 ? ` x${entry.stacks}` : ""} ({entry.turnsRemaining})
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
                    ? "bg-amber-400 text-amber-950 shadow-lg shadow-amber-950/40"
                    : "bg-white/10 text-amber-100 hover:bg-white/20"
                }`}
              >
                Actions
              </button>
              <button
                onClick={() => setActiveTab("spells")}
                className={`px-3 py-1 rounded-full transition ${
                  activeTab === "spells"
                    ? "bg-violet-400 text-violet-950 shadow-lg shadow-violet-950/40"
                    : "bg-white/10 text-amber-100 hover:bg-white/20"
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
