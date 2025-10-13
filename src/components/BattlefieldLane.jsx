// components/BattlefieldLane.jsx
//
// Visual representation of the one-dimensional battlefield lane.

import React from "react";

export default function BattlefieldLane({ grid, player1, player2 }) {
  const min = grid?.min ?? 0;
  const max = grid?.max ?? 5;
  const slots = [];

  for (let pos = min; pos <= max; pos += 1) {
    const occupants = [];

    if (player1?.position === pos) {
      occupants.push({
        id: "player1",
        label: player1.character?.name || "Player 1"
      });
    }

    if (player2?.position === pos) {
      occupants.push({
        id: "player2",
        label: player2.character?.name || "Player 2"
      });
    }

    slots.push({
      pos,
      occupants
    });
  }

  const columnCount = slots.length || 1;

  return (
    <div className="w-full space-y-2">
      <div className="text-sm font-semibold text-slate-200 uppercase tracking-wide">Battlefield Lane</div>
      <div
        className="grid gap-2 bg-slate-950/60 border border-white/10 rounded-2xl p-4 shadow-inner shadow-slate-950 backdrop-blur"
        style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
      >
        {slots.map((slot) => (
          <div
            key={slot.pos}
            className="flex flex-col items-center border border-white/10 rounded-xl bg-slate-900/80 py-3 px-1 text-xs shadow-md shadow-slate-950/40"
          >
            <div className="font-semibold text-slate-200 mb-1">Pos {slot.pos}</div>
            {slot.occupants.length === 0 ? (
              <div className="text-slate-600">—</div>
            ) : (
              <div className="flex flex-col gap-1 items-center w-full">
                {slot.occupants.map((occ) => (
                  <span
                    key={occ.id}
                    className={`px-2 py-1 rounded-full text-[0.7rem] font-semibold tracking-wide ${
                      occ.id === "player1"
                        ? "bg-indigo-500/90 text-slate-950 border border-indigo-300/50"
                        : "bg-rose-500/90 text-slate-950 border border-rose-300/50"
                    }`}
                  >
                    {occ.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
