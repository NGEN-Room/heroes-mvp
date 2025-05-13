import { applyStatus } from "@/engine/statusWatch";

const archspells = {
    burningarrows:{
        name:"burning arrow",
        mpCost: 5,
        effect: (self, opp) => {
            const dmg = 10;
            EventTarget.hp -= dmg;
            
            const burn = {
                name: "Burn",
                turnsremaining :5,
                canStack: false,
                effect: (opp) => {
                    opp.hp -= 5;
                }
            }
            applyStatus(opp, burn)
                }
            }
        }
    

export default chSpells