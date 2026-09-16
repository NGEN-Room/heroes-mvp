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
    <div className="game-panel w-full rounded-2xl p-5 space-y-3">
      <div className="flex items-baseline justify-between"><div className="text-sm font-semibold text-amber-100 uppercase tracking-[0.18em]">The banquet hall</div><div className="text-xs text-amber-100/45">Close the distance to strike</div></div>
      <div
        className="grid gap-2 bg-black/25 border border-amber-100/10 rounded-xl p-3 shadow-inner"
        style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
      >
        {slots.map((slot) => (
          <div
            key={slot.pos}
            className="flex flex-col items-center border border-amber-100/10 rounded-xl bg-stone-950/35 py-3 px-1 text-xs"
          >
            <div className="font-semibold text-amber-100/60 mb-1">{slot.pos + 1}</div>
            {slot.occupants.length === 0 ? (
              <div className="text-slate-600">—</div>
            ) : (
              <div className="flex flex-col gap-1 items-center w-full">
                {slot.occupants.map((occ) => (
                  <span
                    key={occ.id}
                    className={`px-2 py-1 rounded-full text-[0.7rem] font-semibold tracking-wide ${
                      occ.id === "player1"
                        ? "bg-amber-400 text-amber-950 border border-amber-100/60"
                        : "bg-violet-400 text-violet-950 border border-violet-100/60"
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
