$(function() {
    var map = L.map('map').setView([57.071, -4.307], 6),
        constituencyLayer = L.geoJson().addTo(map),
        regionLayer = L.geoJson().addTo(map);
    
    function getGeoId(element){
        return element.data("geoid");
    }
    
    function onConstituencyAjaxDone(data, status, jqXHR) {
        console.log(data);
    }

    function onConstituencyLinkClick(){
        var geoId = getGeoId($(this));
        console.log("geoId = " + geoId);
        $.ajax({
            url: "/constituency/" + geoId,
            dataType: "json"
        }).done(onConstituencyAjaxDone);
    }


    L.tileLayer('http://{s}.tiles.mapbox.com/v3/colinangusmackay.kjm08kjp/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);
    


    $(".constituency-link").click(onConstituencyLinkClick);
});