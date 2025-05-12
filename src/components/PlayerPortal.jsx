// components/PlayerPortal.jsx

import React from "react";

export default function PlayerPortal({ playerKey, playerData, onQueueAction, onQueueSpell, isReady }) {
  const name = playerData?.character?.name || "???";
  const { hp, mp, ap, status = [], queue = [] } = playerData || {};

  return (
    <div className="border p-4 rounded space-y-2 bg-white">
      <h2 className="text-lg font-bold">{name} ({playerKey})</h2>

      <div className="text-sm">
        <p>❤️ HP: {hp}</p>
        <p>💧 MP: {mp}</p>
        <p>⚡ AP: {ap}</p>
        <p>📛 Status: {status.length > 0 ? status.map(s => s.name).join(", ") : "None"}</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold">Queued:</h4>
        <ul className="list-disc list-inside text-xs">
          {queue.length > 0 ? queue.map((q, idx) => (
            <li key={idx}>{q.name}</li>
          )) : <li>None</li>}
        </ul>
      </div>

      {!isReady && (
        <div className="flex gap-2 flex-wrap">
          {Object.entries(playerData?.character?.actions || {}).map(([key, action]) => (
            <button
              key={key}
              className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
              onClick={() => onQueueAction(playerKey, action)}
            >
              {action.name}
            </button>
          ))}

          {Object.entries(playerData?.character?.spells || {}).map(([key, spell]) => (
            <button
              key={key}
              className="px-2 py-1 bg-purple-600 text-white text-xs rounded"
              onClick={() => onQueueSpell(playerKey, spell)}
            >
              {spell.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
