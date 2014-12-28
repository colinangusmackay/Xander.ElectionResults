console.log("home.js is loading");
$(function(){
    console.log("document is ready and running");
    var map = L.map('map').setView([57.071, -4.307], 6);
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/colinangusmackay.kjm08kjp/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);
});