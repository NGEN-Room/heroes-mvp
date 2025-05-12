import { establishStatus } from "@/engine/statusWatch";

const chActions = {
  gutterPig: {
    name: "Gutter Pig",
    cost: 3,
    speed: 3,
    alignment: "speed",
    effect: (self, target, state) => {
      const dmg = 10;
      target.hp -= dmg;

      establishStatus(target, {
        name: "Bleed",
        turns: 5,
        canStack: true,
        effectFn: (t) => {
          t.hp -= 1;
        }
      }, self);
    }
  },

  doubleSlash: {
    name: "Double Slash",
    cost: 2,
    speed: 4,
    alignment: "speed",
    effect: (self, target, state) => {
      const dmg = 5;
      target.hp -= dmg;

      establishStatus(target, {
        name: "Bleed",
        turns: 5,
        canStack: true,
        effectFn: (t) => {
          t.hp -= 1;
        }
      }, self);
    }
  }
};

export default chActions;