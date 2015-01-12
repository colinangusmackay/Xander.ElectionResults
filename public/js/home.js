$(function () {
    // init
    var map = L.map('map').setView([57.071, -4.307], 6),
        constituencyLayer = L.geoJson().addTo(map),
        regionLayer = L.geoJson().addTo(map);
    
    
    // functions
    function getGeoId(element) {
        return element.data("geoid");
    }
    
    function onConstituencyAjaxDone(data, status, jqXHR) {
        console.log(data);
        L.geoJson(data, {
            style: function (feature) {
                var color = "#888888";

                switch (feature.properties.winningParty) {
                    case "SNP":
                        color = "#ffff00";
                        break;
                    case "Labour":
                        color = "#ff0000";
                        break;
                    case "Liberal Democrats":
                        color = "#ffaa22";
                        break;
                    case "Conservative":
                        color = "#0000ff";
                        break;
                }
                return {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.5,
                    weight: 2
                };
            }
        }).addTo(constituencyLayer);
    }
    
    function onConstituencyLinkClick() {
        var geoId = getGeoId($(this));
        $.ajax({
            url: "/constituency/" + geoId,
            dataType: "json"
        }).done(onConstituencyAjaxDone);
    }
    
    function onInitConstituency() {
        var element = $(this),
            geoId = getGeoId(element);
        if (geoId === "")
            return;
        
        $.ajax({
            url: "/constituency/" + geoId,
            dataType: "json"
        }).done(onConstituencyAjaxDone);

    }

    // set up
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/colinangusmackay.kjm08kjp/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);
    
    $(".constituency-link").click(onConstituencyLinkClick);

    $(".constituency-link").each(onInitConstituency);
});