describe("regionWinners",function(){
   it("contains the right set of winners",function(){
      var logic=require("../logic"),
          _=require("underscore"),
          gateway = require("../data"),
          data = gateway.electionData(),
          winners = logic.regionWinners(data.regions[0]);

       expect(winners.length).toBe(data.regions[0].additionalMembers);
       expect(winners[0].listMember).toBe("Siobhan McMahon");
       expect(winners[1].listMember).toBe("Mark Griffin");
       expect(winners[2].listMember).toBe("Richard Lyle");
       expect(winners[3].listMember).toBe("Margaret Mitchell");
       expect(winners[4].listMember).toBe("Margaret McCulloch");
       expect(winners[5].listMember).toBe("Clare Adamson");
   });
});