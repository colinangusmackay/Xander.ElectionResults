describe("additional member results well formatted", function(){
    var _= require("underscore"),
        data = require("../election.json"),
        regions = data.regions;
    _.each(regions, function(region){
        var results = region.results;
        _.each(results, function(result){

            it(region.name+" result has party name",function(){
                expect(result.party).not.toBeUndefined();
                expect(result.party).not.toBeNull();
                expect(result.party.length).toBeGreaterThan(0);
            });

            it(region.name+" - "+result.party+ " has votes", function(){
                expect(result.votes).not.toBeUndefined();
                expect(result.votes).not.toBeNull();
                expect(typeof(result.votes)).toBe("number");
                expect(result.votes).not.toBeLessThan(0);
            });

            it(region.name+" - "+result.party+ " has a partyList", function(){
                expect(result.partyList).not.toBeUndefined();
                expect(result.partyList).not.toBeNull();
                expect(typeof(result.partyList)).toBe("object");
                expect(result.partyList.length).toBeGreaterThan(0);
            });
        });

        it(region.name+" has unique list of parties", function(){
            var parties= _.map(results, function(item){return item.party;});
            var sortedParties = _.sortBy(parties, function(name){return name;});
            var distinctParties = _.uniq(sortedParties, true);
            expect(sortedParties.length).toBe(distinctParties.length);
        });
    });
});