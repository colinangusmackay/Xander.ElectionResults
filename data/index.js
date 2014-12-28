var data = require("./election.json");
var _ = require("underscore");
var init = _.once(annotateData);
module.exports.electionData = function(){
    init();
    return data;
};

function annotateData(){
    _(data.regions).each(function(region){
       _(region.constituencies).each(function(constituency){
          constituency.region = region;
       });
    });
}