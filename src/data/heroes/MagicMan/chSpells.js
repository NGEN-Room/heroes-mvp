import { dealDamage } from "@/engine/combatUtils";

const chSpells = {
  fireball: {
    name: "Fireball",
    mpCost: 5,
    speed: 1,
    alignment: "brain",
    range: "ranged",
    effect: (self, target) => {
      const damage = 10;
      dealDamage(target, damage, self.state, "Fireball");
    }
  }
};

export default chSpells;
