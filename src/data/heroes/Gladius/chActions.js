import { establishStatus } from "@/engine/statusWatch";
import { dealDamage } from "@/engine/combatUtils";

const chActions = {
  gutterPig: {
    name: "Gutter Pig",
    cost: 3,
    speed: 3,
    alignment: "speed",
    range: 1,
    effect: (self, target, state) => {
      console.log("self:", self, "target:", target, "target.hp:", target.hp);
      const dmg = 10;
      dealDamage(target, dmg, state, "Gutter Pig");
      establishStatus(target, {
        name: "Bleed",
        turns: 5,
        canStack: true,
        effectFn: (t) => {
          dealDamage(t, 1, null, "Bleed");
        }
      }, self);
    }
  },

  doubleSlash: {
    name: "Double Slash",
    cost: 2,
    speed: 4,
    alignment: "speed",
    range: 1,
    effect: (self, target, state) => {
      const dmg = 5;
      dealDamage(target, dmg, state, "Double Slash");

      establishStatus(target, {
        name: "Bleed",
        turns: 5,
        canStack: true,
        effectFn: (t) => {
          dealDamage(t, 1, null, "Bleed");
        }
      }, self);
    }
  }
};

export default chActions;
