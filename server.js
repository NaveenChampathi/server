var express    = require('express');        
var app        = express();                 
var mongoose   = require('mongoose');
var profile    = require('./Profile.model')

var url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    url = process.env.OPENSHIFT_MONGODB_DB_URL +
    process.env.OPENSHIFT_APP_NAME;
}

// Connect to mongodb
var connect = function () {
    mongoose.connect(url);
};
connect();

var db = mongoose.connection;

db.on('error', function(error){
    console.log("Error loading the db - "+ error);
});

db.on('disconnected', connect);

app.get('/', function(req, res) {
    profile.find({}).exec(function(err, names) {
        res.header("Content-Type:","text/json");
        res.end(JSON.stringify(names));
    });
    //res.send('Hey Naveen!');
});

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP, function() {
    console.log('Listening on 3000');
});






