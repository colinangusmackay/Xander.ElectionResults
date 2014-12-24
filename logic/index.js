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