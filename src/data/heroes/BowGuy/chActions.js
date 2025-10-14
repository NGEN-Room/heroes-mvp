import { dealDamage } from "@/engine/combatUtils";

const chActions = {
    killshot: {
        name: "Killshot",
        mpCost: 100,
        apCost: 100,
        speed: 1,
        alignment: "speed",
        dmg : 0,
        range: "global",
        effect: (self, target, state) => {
            console.log("target:", target, "self:", self, "target.hp:", target?.hp)
                if (!target || typeof target.hp !== "number"){
                console.log("target is not valid")
                return
            }
            if (Math.random()< 0.01){
                const total = (target.hp ?? 0) + (target.shield ?? 0);
                dealDamage(target, total, state, "Killshot");
                console.log("killshot landed")
            }
            else{
                console.log("missed")
            } 
        }
    },
    multishot:{
        name: "Multishot",
        apCost: 10,
        dmg: 50,
        speed: 1,
        range: "ranged",
        effect: (self, target, state) => {
            console.log("target:" + target, "self:" + self, "target.hp:" + target?.hp)
            if(!target || typeof target.hp !== "number"){
                console.log("target is not valid")
                return
            }
            dealDamage(target, 50, state, "Multishot");
            console.log("multishot landed for 50 damage")
        }
    },
    singleshot:{
        name: "Singleshot",
        apCost: 1,
        dmg: 5,
        range: "ranged",
        effect:(self,target, state) => {
            if(!target || typeof target.hp !== "number"){
                console.log("target is not valid")
                return
            }
            dealDamage(target, 5, state, "Singleshot");
            console.log("singleshot landed for 5 damage")
        }
    },
    
}
export default chActions
