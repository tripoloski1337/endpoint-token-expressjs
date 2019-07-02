var mongoose = require('mongoose')
var Schema 	 = mongoose.Schema

var tb_dataSchm = new Schema({
	username: {type:String , required:true , unique:true},
	password: {type:String , required:true},
	email: 	  {type:String , required:true},
	alamat:   {type:String , required:true}
},{
	timestamps: true
})

var tb_dataSchm = mongoose.model("tb_data",tb_dataSchm)

module.exports = tb_dataSchm