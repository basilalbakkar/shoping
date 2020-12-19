const mongoose = require('mongoose')
const objectId=mongoose.Schema.Types.ObjectID
let schema =mongoose.Schema;
let tshirt = new schema({
	
	_id:{type: String ,required:true , default:"No ID" },
	
	name:{type: String ,required:true , default:"NoName" },
	
    categorys:[{type:String , ref:'Category'}],
	
	tprice:{type:Number ,required:true , default:"There is no price" },
	
	numberItem:{type:Number ,required:true , default:"We don't know how many items are available" }
	
	
})
module.exports = mongoose.model('Tshirt',tshirt)



