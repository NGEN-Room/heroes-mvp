import { establishStatus } from "@/engine/statusWatch";
import { dealDamage, healCharacter, addShield } from "@/engine/combatUtils";

const chSpells = {
  // 1. 🩸 Blood Leech — deals damage and restores HP based on bleed count
  bloodLeech: {
    name: "Blood Leech",
    mpCost: 10,
    speed: 2,
    alignment: "brain",
    range: 2,
    effect: (self, target, state) => {
      const baseDmg = 8;
      dealDamage(target, baseDmg, state, "Blood Leech");

      // Count bleeds on target
      const bleedCount = target.status.filter(s => s.name === "Bleed").length;
      const healAmount = bleedCount * 2;
      const { healed, overflow } = healCharacter(self, healAmount);

      if (overflow > 0) {
        addShield(self, overflow, state, "Blood Leech");
      }

      if (state?.logs) {
        const details = [];
        if (healed > 0) details.push(`restores ${healed} HP`);
        if (overflow > 0) details.push(`gains ${overflow} shield`);
        const detailSuffix = details.length > 0 ? ` (${details.join(", ")})` : "";
        state.logs.push(`${self.character.name} leeches ${healAmount} vitality from ${target.character.name}${detailSuffix}.`);
      }
    }
  },

  // 2. 🗡️ Blood Tracker — applies a buff to Gladius if the target is bleeding
  bloodTracker: {
    name: "Blood Tracker",
    mpCost: 5,
    speed: 3,
    range: 2,
    effect: (self, target, state) => {
      const isBleeding = target.status.some(s => s.name === "Bleed");
      if (isBleeding) {
        establishStatus(self, {
          name: "Focused",
          turns: 3,
          canStack: false,
          effectFn: (self) => {
            self.ap += 1;
          }
        }, self);
      } else {
        if (state?.logs) {
          state.logs.push(`${self.character.name} found no bleeding to track.`);
        }
      }
    }
  },

  // 3. 🔪 Final Bleed — stronger bleed that only activates if target already bleeding
  finalBleed: {
    name: "Final Bleed",
    mpCost: 7,
    speed: 1,
    alignment: "speed",
    range: 1,
    effect: (self, target, state) => {
      const isBleeding = target.status.some(s => s.name === "Bleed");
      if (isBleeding) {
        const dmg = 12;
        dealDamage(target, dmg, state, "Final Bleed");
        establishStatus(target, {
          name: "Bleed",
          turns: 3,
          canStack: true,
          effectFn: (target) => {
            dealDamage(target, 2, null, "Bleed");
          }
        }, self);
      } else {
        if (state?.logs) {
          state.logs.push(`${self.character.name} tried to finish the wound, but the target wasn’t bleeding.`);
        }
      }
    }
  }
};

export default chSpells;
