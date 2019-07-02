var mongoose = require("mongoose")
var crypto 	 = require('crypto')
let jwt = require('jsonwebtoken');
var connectionString = 'mongodb://root@localhost/testdb'
var options          = {server : { socketOptions: { keepAlive: 1 }}}
var tb_content		 = require("../model/content")
var secrets	 		 = "arsalan"
var password 		 = crypto.createHmac('sha256',secrets).update('toor').digest('hex')
mongoose.Promise = global.Promise
mongoose.connect(connectionString,options)


var content = new tb_content({
	titlew: "ini judulnya",
	author: "leonard",
	desc: "no description",
});
content.save(function(err){
	if(err) throw err;
	console.log('info created');
});

//console.log("TOKEN : " + token_code)
