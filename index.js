var createError = require('http-errors');
var express = require('express');
//var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
//var flash = require('express-flash');
//var flash = require('connect-flash');
var session = require('express-session');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

const apiRouter = require("./routes/api.js");

const app = express();
const http = require("http")

var server = http.createServer(app)
var PORT = 8000

app.set('view engine', 'ejs');
//app.set('view options', {delimiter: '?'});
app.set('views', __dirname + '/view');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use(logger("dev"))
app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body == 'object' && '_method' in req.body)
    {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

var model 		= require("./model/data");
var connectionString = 'mongodb://root@localhost/testdb'
var options          = {server : { socketOptions: { keepAlive: 1 }}}
mongoose.Promise = global.Promise
mongoose.connect(connectionString,options)

app.use("/", apiRouter)
app.use(function(req , res , next){
	next(createError(404))
})
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { 
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});

server.listen(PORT, function(){
  console.log('[+] listen di port : ' + PORT);
});
module.exports = app

