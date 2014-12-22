describe("country data is formatted well", function(){
    var data  = require("../election.json");

    it("has a name", function(){
        expect(data.name).not.toEqual(undefined);
        expect(data.name).not.toEqual(null);
    });

    it("has 8 regions", function(){
        expect(data.regions.length).toEqual(8);
    });
});