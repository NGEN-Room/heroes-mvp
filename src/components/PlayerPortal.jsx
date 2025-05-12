// components/PlayerPortal.jsx

import React from "react";

export default function PlayerPortal({ playerKey, playerData, onQueueAction, onQueueSpell, isReady }) {
  const name = playerData?.character?.name || "???";
  const { hp, mp, ap, status = [], queue = [] } = playerData || {};

  return (
    <div className="border rounded-lg bg-white shadow-md p-4 space-y-4 flex flex-col items-center">
      <div className="w-24 h-24 bg-gray-300 rounded-full border-2 border-gray-500 mb-2 flex items-center justify-center text-xs text-gray-700">
        Avatar
      </div>

      <h2 className="text-lg font-bold text-center">{name} <span className="text-xs text-gray-500">({playerKey})</span></h2>

      <div className="text-sm space-y-1 w-full">
        <p>❤️ <strong>HP:</strong> {hp}</p>
        <p>💧 <strong>MP:</strong> {mp}</p>
        <p>⚡ <strong>AP:</strong> {ap}</p>
        <p>📛 <strong>Status:</strong> {status.length > 0 ? status.map((s, i) => (
          <span key={`${s.name}-${i}`} className="inline-block bg-yellow-200 text-yellow-900 text-xs px-2 py-0.5 rounded-full mr-1">{s.name}</span>
        )) : <span className="text-gray-500">None</span>}</p>
      </div>

      <div className="w-full">
        <h4 className="text-sm font-semibold mb-1">Queued Actions:</h4>
        <ul className="flex flex-wrap gap-2">
          {queue.length > 0 ? queue.map((q, idx) => (
            <li key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded shadow">{q.name}</li>
          )) : <li className="text-xs text-gray-400">No actions queued</li>}
        </ul>
      </div>

      {!isReady && (
        <div className="flex flex-wrap gap-2 w-full justify-center">
          {Object.entries(playerData?.character?.actions || {}).map(([key, action]) => (
            <button
              key={key}
              className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded shadow"
              onClick={() => onQueueAction(playerKey, action)}
            >
              {action.name}
            </button>
          ))}

          {Object.entries(playerData?.character?.spells || {}).map(([key, spell]) => (
            <button
              key={key}
              className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded shadow"
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
