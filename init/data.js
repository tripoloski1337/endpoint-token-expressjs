var mongoose = require("mongoose")
var crypto 	 = require('crypto')
var connectionString = 'mongodb://root@localhost/testdb'
var options          = {server : { socketOptions: { keepAlive: 1 }}}
var tb_data			 = require("../model/data")
var secrets	 		 = "arsalan"
var password 		 = crypto.createHmac('sha256',secrets).update('toor').digest('hex')
mongoose.Promise = global.Promise
mongoose.connect(connectionString,options)
var data = new tb_data({
	username: "arsalan",
	password: password,
	email: "arsalan.dp@gmail.com",
	alamat: "bekasi utara"
});
data.save(function(err){
	if(err) throw err;
	console.log('info created');
});


