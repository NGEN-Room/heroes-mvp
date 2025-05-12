const chSpells = {
    firebolt: {
      name: "Firebolt",
      cost: 2,
      mpCost: 10,
      speed: 2,
      effect: (self, target) => {
        let damage = 15 + self.modifiedStats.brains * 2;
        target.hp -= damage;
        console.log(`${self.character.name} casts Firebolt for ${damage} damage!`);
      }
    }
  };
  
  export default chSpells;