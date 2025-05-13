const chActions = {
    killshot: {
        name: "Killshot",
        mpCost: 100,
        apCost: 100,
        speed: 1,
        alignment: "speed",
        dmg : 0,
        effect: (self, target) => {
            console.log("target:", target, "self:", self, "target.hp:", target.hp)
                if (!target || target.hp !== "number"){
                console.log("target is not valid")
                return
            }
            if (Math.random()< 0.01){
                target.hp = 0
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
        effect: (self, target) => {
            console.log("target:" + target, "self:" + self, "target.hp:" + target.hp)
            if(!target || typeof target.hp !== "number"){
                console.log("target is not valid")
                return
            }
            target.hp -= 50
            console.log("multishot landed for 50 damage")
        }
    },
    singleshot:{
        name: "Singleshot",
        apCost: 1,
        dmg: 5,
        effect:(self,target) => {
            if(!target || typeof target.hp !== "number"){
                console.log("target is not valid")
                return
            }
            target.hp -= 5
            console.log("singleshot landed for 5 damage")
        }
    },
    
}
export default chActions