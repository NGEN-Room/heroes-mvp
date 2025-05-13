// castSpell = function(spellName, target) {
//     const spell = spells[spellName];
//     if (!spell) {
//       console.log(spellName + " does not exist!");
//       return;
//     }
  
//     spell.cast(character, target);
//   }
  
  //SPELLS
  const chSpells ={
  fireball: {
      name: "Fireball",
      mpCost: 5,
      damage: 10,
      effect: function(self, target) {
        if (self.mp < this.mpCost) {
          console.log(self.name + " does not have enough mp to cast " + this.name + "!");
        } else {
        self.mp -= this.mpCost;
        target.hp -= this.damage;
  
        console.log(caster.name + " casts " + this.name + " on " + target.name + "! and has " + caster.baseStats.mp + " mp left!");
        console.log(target.name + " takes " + this.damage + " damage!");
        }
      }
  } 
  // heal: {
  //     name: "Heal",
  //     mpCost: 5,
  //     healAmount: 10,
  //     cast: function(caster, caster) {
  //       if (caster.baseStats.mp < this.mpCost) {
  //         console.log(caster.name + " does not have enough mp to cast " + this.name + "!");
  //         return;
  //       }
  
  //       caster.baseStats.mp -= this.mpCost;
  //       caster.baseStats.hp += this.healAmount;
  
  //       console.log(caster.name + " casts " + this.name + "! and has " + caster.baseStats.mp + " mp left!");
  //       console.log(caster.name + " heals for " + this.healAmount + " hp!");
  //     }
  
  // }
  
  }


  
  
  export default chSpells;

