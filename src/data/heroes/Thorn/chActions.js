import { dealDamage } from "@/engine/combatUtils";

const chActions = {
  stab: {
    name: "Stab",
    cost: 1,
    speed: 3,
    range: 1,
    effect: (self, target, state) => {
      const damage = 10 + self.modifiedStats.brawn;
      dealDamage(target, damage, state, "Stab");
      console.log(`${self.character.name} stabs ${target.character.name} for ${damage} damage.`);
    }
  }
};

export default chActions;
