import { establishStatus } from "@/engine/statusWatch";

const chActions = {

burningHands: {
    name: "Burning Hands",
    mpCost: 5,
    speed: 1,
    effect: (self, target, state) => {
      const dmg = 10;
      target.hp -= dmg;
  
      establishStatus(target, {
        name: "Burn",
        turns: 5,
        canStack: false,
        effectFn: (target) => {
          target.hp -= 1;
        }
      }, self);
    }
  }
}


export default chActions;