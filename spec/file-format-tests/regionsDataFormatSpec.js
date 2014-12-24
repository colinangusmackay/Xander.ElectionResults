describe("region data is well formatted", function(){
    var _ = require("underscore");
    var data = require("../../election.json");
    var regions = data.regions;

    _.each(regions, function(region){
        var name = region.name;
        it("has a name", function(){
            expect(name).not.toBeUndefined();
            expect(name).not.toBeNull();
            expect(typeof(name)).toEqual("string");
        });

        it(name+" has additionalMembers",function(){
            var additionalMembers = region.additionalMembers;
            expect(additionalMembers).not.toBeUndefined();
            expect(additionalMembers).not.toBeNull();
            expect(typeof(additionalMembers)).toEqual("number");
            expect(additionalMembers).toBeGreaterThan(0);
        });

        it(name+" has constituencies", function(){
           var constituencies = region.constituencies;
            expect(constituencies).not.toBeUndefined();
            expect(constituencies).not.toBeNull();
        });

        it(name+" has results", function(){
            var results = region.results;
            expect(results).not.toBeUndefined();
            expect(results).not.toBeNull();
        });
    });



//    it("has constituencies");
//    it("has results");


});