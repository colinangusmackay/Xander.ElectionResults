var data = require("./election.json");
var _ = require("underscore");
var init = _.once(annotateData);
module.exports.electionData = function(){
    init();
    return data;
};

function annotateData(){
    _(data.regions).each(function(region){
        if (region.geoid !== undefined) {
            region.getGeography = _.once(function(){
                return require("./"+region.geoid+".json");
            });
        }else{region.getGeography = function(){return null;}}
       _(region.constituencies).each(function(constituency){
           if (constituency.geoid !== undefined){
               constituency.getGeography = _.once(function(){
                   return require("./"+constituency.geoid+".json");
               })
           }else{constituency.getGeography = function(){return null;}}
          constituency.region = region;
       });
    });
}