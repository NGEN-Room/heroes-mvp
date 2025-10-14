import { dealDamage } from "@/engine/combatUtils";

const chActions = {
  arcaneSlap: {
    name: "Arcane Slap",
    cost: 1,
    speed: 3,
    range: 1,
    effect: (self, target, state) => {
      const damage = 5 + self.modifiedStats.brain;
      dealDamage(target, damage, state, "Arcane Slap");
      console.log(`${self.character.name} slaps ${target.character.name} for ${damage} damage.`);
    }
  }
};

export default chActions;
