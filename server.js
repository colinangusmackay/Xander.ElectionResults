// Requirements
var http = require("http");
var express = require("express");
var ejsLayouts = require("express-ejs-layouts");

// Set up the application
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);

app.set("views","./views");
app.set("port", process.env.PORT || 3000);
app.set("view engine","ejs");
app.set("layout extractScripts", true);

// Setup routes
app.param("constituency", function(req,res,next,id) {
    req.constituency = id;
    next();
});
app.get("/", require("./routes/home.js"));
app.get("/constituency/:constituency", require("./routes/constituencyData.js"));

// Run up the server
http.createServer(app).listen(app.get("port"), function(){
    console.log("Express server listening on port " + app.get("port"));
});