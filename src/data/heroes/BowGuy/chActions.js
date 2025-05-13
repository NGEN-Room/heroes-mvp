const actionList = {
    killshot: {
        name: "Killshot",
        cost : 100,
        dmg : "allthehealth",
        effect: (self, opp) => {
            if (Math.random() < 0.01 ){
                opp.hp -= opp.hp
            } 
            else{
                console.log("missed")
            } 
        }
    },
    multishot:{
        name: "Multishot",
        cost: 10,
        dmg: 50,
        effect: (self, opp) => {
            opp.hp -= 50 + self.modifiedstats.speed
        }
    },
    singleshot:{
        name: "Singleshot",
        cost: 1,
        dmg: 5,
        effect:(self,opp) => {
            opp.hp -= 5 + self.modifiedstats.speed
        }
    },
    
}
export default chActions