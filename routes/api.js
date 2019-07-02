var express = require("express")
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
var tb_data = require("../model/data")
var tb_content = require("../model/content")
const exjwt = require('express-jwt');
var crypto 	 = require('crypto')
var router = express.Router();
var key = 'arsalan'
//var Auth_mdw = require("../middleware/api")

const jwtMW = exjwt({
    secret: key
});


router.get("/" , jwtMW ,function(req , res , next){
	res.send({status:200})
});

router.post("/login", function(req , res , next){
	var uname = req.body.username
	var pass  = req.body.password
	var password 		 = crypto.createHmac('sha256',key).update(pass).digest('hex')
	console.log(uname + " " + password)
	tb_data.find({username : uname , password:password} ,  function(err , user){
		if(user.length > 0 ){
			var token = jwt.sign({ id: user._id, username: user.username }, key, { expiresIn: 129600 }); 
			res.send({token:token})
		}else {
			res.send({status:"auth error"})
		}
	})
})


router.get("/content/list" , jwtMW , function(req , res , next){
	tb_content.find({}, function(err , data){
		res.send(data)
	})	
})

router.get("/content/read/:id" , jwtMW , function(req , res , next){
	var id = req.params.id
	console.log("id : " + id)
	tb_content.find({_id:id} , function(err , data){
		res.send(data)
	})
})

module.exports = router