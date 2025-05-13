const chActions = {
    arcaneSlap: {
      name: "Arcane Slap",
      cost: 1,
      speed: 3,
      effect: (self, target) => {
        let damage = 5 + self.modifiedStats.brain;
        target.hp -= damage;
        console.log(`${self.character.name} slaps ${target.character.name} for ${damage} damage.`);
      }
    }
  };
  
  export default chActions;