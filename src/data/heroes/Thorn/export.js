import chObject from "./chObject.js";
import chSpells from "./chSpells.js";
import chActions from "./chActions.js";

const thorn = {
  ...chObject,
  spells: chSpells,
  actions: chActions
};

export default thorn;