export function applyModifiers(character) {
  const modified = JSON.parse(JSON.stringify(character));
  const { age, rawStats, baseStats } = character;

  let brawn = rawStats.brawn;
  let brains = rawStats.brains;
  let speed = rawStats.speed;

  if (age <= 20) {
    brawn += 2; brains -= 2; speed += 1;
  } else if (age >= 41 && age <= 60) {
    brawn -= 2; brains += 2; speed -= 1;
  } else if (age > 60) {
    brawn -= 3; brains += 3; speed -= 2;
  }

  let hp = baseStats.hp;
  let mp = baseStats.mp;
  let ap = baseStats.ap;

  switch (character.class.className) {
    case "Warrior": hp += 30; ap += 1; break;
    case "Mage": hp -= 10; mp += 40; break;
  }

  modified.modifiedStats = { brawn, brains, speed, hp, mp, ap };
  return modified;
}