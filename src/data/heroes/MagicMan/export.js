import chObject from "./chObject.js";
import chSpells from "./chSpells.js";
import chActions from "./chActions.js";


const magicMan = {
    ...chObject,
    spells: chSpells,
    actions: chActions
  };

  export default magicMan;