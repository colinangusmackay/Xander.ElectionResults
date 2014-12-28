var _=require("underscore");
module.exports.sortedConstituencies = function(data){
    var constituencies = _.reduce(data.regions, function(memo, region){
        return _.union(memo,region.constituencies);
    },[]);

    return _.sortBy(constituencies, function(constituency){
        return constituency.name;
    });
};

module.exports.sortedRegions = function(data){
    return _.sortBy(data.regions, function(region){
        return region.name;
    });
};

function constituencyWinner(constituency) {
    var winner= _.max(constituency.results,function(result){
        return result.votes;
    });
    return {
        constituencyName: constituency.name,
        regionName:constituency.region.name,
        candidateName:winner.candidate,
        party:winner.party
    };
}

module.exports.constituencyWinner = constituencyWinner;

module.exports.regionWinners = function(region){
  // This implements the modified D'Hondt voting algorithm used by the Scottish Parliament.
  // The modification is that the parties of the winners of the constituency votes are taken into account when
  // calculating the divisor used in each round, such that the divisor is not uniform for each party in each round
  // but will be different depending on the number of seats won at the constituency level.
  var partyCounts = {};
    _.each(region.constituencies, function(constituency){
        var winner = constituencyWinner(constituency),
            winnerName = winner.party;
        if (partyCounts[winnerName]===undefined)
            partyCounts[winnerName] = 1;
        else
            partyCounts[winnerName] = partyCounts[winnerName] + 1;
    });

    var roundData=[];
    for(var i=1;i<=region.additionalMembers;i++){
        _.each(region.results,function(result){
            var divisor = i; // The uniform divisor
            if (partyCounts[result.party] !== undefined)
                divisor += partyCounts[result.party]; // modified by the constituency winnings (if applicable)
            roundData.push({
                round:i,
                regionName:region.name,
                party:result.party,
                score:result.votes/divisor
            });
        })
    }

    // Sort descending then limit to the winners
    roundData = _.sortBy(roundData,function(partyRound){
        return -partyRound.score;
    });
    roundData = _.first(roundData, region.additionalMembers);

    // Find and attach the appropriate person form the party list.
    _.each(roundData,function(round){
        var partyList = _.find(region.results,function(party){
            return party.party === round.party;
        }).partyList;
        //TODO:Fix this because list members may have already been picked in a constituency vote, however the current data has extracted this already.
        round.listMember=partyList[round.round-1];
    });
    return roundData
};
