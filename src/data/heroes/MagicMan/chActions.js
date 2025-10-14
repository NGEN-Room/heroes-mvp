import { establishStatus } from "@/engine/statusWatch";
import { dealDamage } from "@/engine/combatUtils";

const chActions = {
  burningHands: {
    name: "Burning Hands",
    mpCost: 5,
    speed: 1,
    range: 1,
    effect: (self, target, state) => {
      const dmg = 10;
      dealDamage(target, dmg, state, "Burning Hands");

      establishStatus(target, {
        name: "Burn",
        turns: 5,
        canStack: false,
        effectFn: (t) => {
          dealDamage(t, 1, null, "Burn");
        }
      }, self);
    }
  }
};

export default chActions;
