describe("sortedConstituencies",function(){
    var logic = require("../logic/");
    var data=require("../data/election.json");
    it("has 73 constituencies",function(){
        expect(logic.sortedConstituencies(data).length).toBe(73);
    })
});