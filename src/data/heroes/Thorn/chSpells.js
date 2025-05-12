const chSpells = {
    rallyCry: {
      name: "Rally Cry",
      cost: 2,
      mpCost: 5,
      speed: 1,
      effect: (self) => {
        self.ap += 1;
        console.log(`${self.character.name} gains bonus AP from Rally Cry.`);
      }
    }
  };
  
  export default chSpells;