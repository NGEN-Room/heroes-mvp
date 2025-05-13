import { establishStatus, applyStatus } from "@/engine/statusWatch";

const chSpells = {
  // 1. 🩸 Blood Leech — deals damage and restores HP based on bleed count
  bloodLeech: {
    name: "Blood Leech",
    mpCost: 10,
    speed: 2,
    alignment: "brain",
    effect: (self, target, state) => {
      const baseDmg = 8;
      target.hp -= baseDmg;

      // Count bleeds on target
      const bleedCount = target.status.filter(s => s.name === "Bleed").length;
      const healAmount = bleedCount * 2;
      self.hp += healAmount;

      if (state?.logs) {
        state.logs.push(`${self.character.name} leeches ${healAmount} HP from ${target.character.name}'s bleeding wounds.`);
      }
    }
  },

  // 2. 🗡️ Blood Tracker — applies a buff to Gladius if the target is bleeding
  bloodTracker: {
    name: "Blood Tracker",
    mpCost: 5,
    speed: 3,
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
    effect: (self, target, state) => {
      const isBleeding = target.status.some(s => s.name === "Bleed");
      if (isBleeding) {
        const dmg = 12;
        target.hp -= dmg;
        establishStatus(target, {
          name: "Bleed",
          turns: 3,
          canStack: true,
          effectFn: (target) => {
            target.hp -= 2;
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
