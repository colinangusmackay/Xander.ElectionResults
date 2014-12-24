describe("sortedRegions",function(){
    var logic = require("../logic");
    var data = require("../data/election.json");
    var _ = require("underscore");
    it("has 8 regions",function(){
        expect(logic.sortedRegions(data).length).toBe(8);
    });

    it("has 56 regional list seats",function(){
        var regions = logic.sortedRegions(data);
        var numSeats = _.reduce(regions, function(memo,region){
            return memo+region.additionalMembers;
        },0);
        expect(numSeats).toBe(56);
    });
});