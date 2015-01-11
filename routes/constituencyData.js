var _ = require("underscore");
var gateway = require("../data");
var logic = require("../logic");
module.exports = function (req, res) {
    console.log("constituencyData");
    var constituencyGeoId = req.constituency,
        data = gateway.electionData(),
        constituency = logic.constituencyByGeoId(data, constituencyGeoId),
        winner = logic.constituencyWinner(constituency),
        model = {
            constituencyName: constituency.name,
            geoid: constituency.geoid,
            regionName:constituency.region.name,
            winningCandidateName: winner.candidateName,
            winningParty: winner.party,
            geography: constituency.getGeography(),
            sortedCandidates: _.sortBy(constituency.results, function(item){return -item.votes;})
        };

    console.log("geoId = " + constituencyGeoId);

    res.json(model);
}
