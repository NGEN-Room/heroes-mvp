import chObject from "./chObject.js";
import chSpells from "./chSpells.js";
import chActions from "./chActions.js";

const kaia = {
  ...chObject,
  spells: chSpells,
  actions: chActions
};

export default kaia;