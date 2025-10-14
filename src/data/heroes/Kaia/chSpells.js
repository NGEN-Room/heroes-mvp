import { dealDamage } from "@/engine/combatUtils";

const chSpells = {
  firebolt: {
    name: "Firebolt",
    mpCost: 10,
    speed: 2,
    range: "ranged",
    effect: (self, target) => {
      const damage = 15 + self.modifiedStats.brain * 2;
      dealDamage(target, damage, self.state, "Firebolt");
    }
  },
  burningHands: {
    name: "Burning Hands",
    mpCost: 5,
    speed: 1,
    range: 1,
    alignment: "brain",
    effect: (self, target, state) => {
      const damage = 5;
      dealDamage(target, damage, state, "Burning Hands");

      const burn = {
        name: "Burn",
        turnsRemaining: 5,
        canStack: false,
        effect: (opp) => {
          dealDamage(opp, 1, null, "Burn");
        }
      };

      target.status.push(burn);
    }
  }
};

export default chSpells;
