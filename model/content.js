var mongoose = require('mongoose')
var Schema 	 = mongoose.Schema

var tb_contentSchm = new Schema({
	title: {type:String , required:true , unique:true},
	author: {type:String , required:true},
	desc:  {type:String , required:true},
},{
	timestamps: true
})

var tb_contentSchm = mongoose.model("tb_content",tb_contentSchm)

module.exports = tb_contentSchm