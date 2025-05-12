const chSpells = {
    firebolt: {
      name: "Firebolt",
      mpCost: 10,
      speed: 2,
      effect: (self, target) => {
        let damage = 15 + self.modifiedStats.brains * 2;
        target.hp -= damage;

      }
    },
    burningHands: {
      name: "Burning Hands",
      mpCost: 5,
      speed: 1,
      alignment: "brains", // use the brain modificaiton
      effect: (self, target, state) => {
        let damage = 5
        target.hp -= damage
        
        const burn = {
          name: "Burn",
          turnsRemaining: 5,
          canStack: false,
          effect: (opp) => {
            opp.hp -= 1
          }

        }
        target.status.push(burn)
      }
    }
  };

  
  export default chSpells;