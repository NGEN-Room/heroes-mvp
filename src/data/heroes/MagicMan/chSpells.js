const chSpells = {
  fireball: {
    name: "Fireball",
    mpCost: 5,
    speed: 1,
    alignment: "brain",
    range: "ranged",
    effect: (self, target) => {
      const damage = 10;
      target.hp -= damage;
    }
  }
};

export default chSpells;
