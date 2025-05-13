export const heroRoster = {
  Thorn: () => import("@/data/heroes/Thorn/export.js"),
  Kaia: () => import("@/data/heroes/Kaia/export.js"),
  Gladius: () => import("@/data/heroes/Gladius/export.js"),
  magicMan: () => import("@/data/heroes/MagicMan/export.js"),
  BowGuy: () => import("@/data/heroes/BowGuy/export.js")
};