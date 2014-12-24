describe("constituency result data is well formatted", function(){
    var data = require("../../data/election.json"),
        _ = require("underscore"),
        regions = data.regions;

    _.each(regions, function(region){
        var constituencies = region.constituencies;
        _.each(constituencies, function(constituency){
            var results = constituency.results;
            _.each(results, function(result){

                it(region.name+" - "+constituency.name+" has party",function(){
                    expect(result.party).not.toBeUndefined();
                    expect(result.party).not.toBeNull();
                });

                it(region.name+" - "+constituency.name+" - "+result.party + " has candidate", function(){
                    expect(result.candidate).not.toBeUndefined();
                    expect(result.candidate).not.toBeNull();
                });

                it(region.name+" - "+constituency.name+" - "+result.party + " has votes", function(){
                    expect(result.votes).not.toBeUndefined();
                    expect(result.votes).not.toBeNull();
                    expect(typeof(result.votes)).toBe("number");
                    expect(result.votes).not.toBeLessThan(0);
                });


            });
        })
    });


});
