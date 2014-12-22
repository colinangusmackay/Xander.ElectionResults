describe("constituency data is well formatted", function(){
   var _= require("underscore"),
       data = require("../election.json"),
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
    });
});