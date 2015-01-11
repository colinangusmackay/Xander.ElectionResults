var _ = require("underscore");
var gateway = require("../data");
var logic = require("../logic");
module.exports = function(req, res) {
    var constituencyGeoId = req.constituency,
        data = gateway.getConstituencyData(),
        constituency = logic.constituencyByGeoId(data, constituencyGeoId),
        winner = logic.constituencyWinner(constituency),
        model = {
            constituencyName: constituency.name,
            geoid: constituency.geoid,
            regionName:constituency.region.name,
            winningCandidateName: winner.candidateName,
            winningParty: winner.party,
            geography: constituency.getGeography(),
            candidates: _.sortBy(constituency.results, function(item){return item.votes;})
        };

    res.json(model);
}
