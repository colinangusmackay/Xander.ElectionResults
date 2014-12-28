var _ = require("underscore");
var gateway = require("../data");
var logic = require("../logic");
module.exports = function(req, res){
    var data=gateway.electionData(),
        constituencies = logic.sortedConstituencies(data),
        regions = logic.sortedRegions(data),
        model={
            constituencies: _(constituencies).map(function(constituency){
                return logic.constituencyWinner(constituency);
            }),
            regions: _(regions).map(function(region){
                return {
                    regionName: region.name,
                    winners:logic.regionWinners(region)};
            })
        };
    res.render("home.ejs",model);
};