describe("constituency data is well formatted", function(){
   var _= require("underscore"),
       data = require("../../data/election.json"),
       regions= data.regions;
    _.each(regions,function(region){
       var constituencies=region.constituencies;
        _.each(constituencies,function(constutuency){

            it(region.name+" has a constituency name",function(){
                expect(constutuency.name).not.toBeUndefined();
                expect(constutuency.name).not.toBeNull();
            });

            it(region.name+" - "+constutuency.name+" has results",function(){
                expect(constutuency.results).not.toBeUndefined();
                expect(constutuency.results).not.toBeNull();
            });

        });

        it(region.name+" has unique list of constituencies", function(){
            var constituencyNames= _.map(constituencies, function(item){return item.name;});
            var sortedNames = _.sortBy(constituencyNames, function(name){return name;});
            var distinctNames = _.uniq(sortedNames, true);
            expect(sortedNames.length).toBe(distinctNames.length);
        });
    });
});