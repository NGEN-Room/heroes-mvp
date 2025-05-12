const chActions = {
    stab: {
      name: "Stab",
      cost: 1,
      speed: 3,
      effect: (self, target) => {
        let damage = 10 + self.modifiedStats.brawn;
        target.hp -= damage;
        console.log(`${self.character.name} stabs ${target.character.name} for ${damage} damage.`);
      }
    }
  };
  
  export default chActions;