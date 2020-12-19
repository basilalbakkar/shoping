const mongoose = require('mongoose')
const objectId=mongoose.Schema.Types.ObjectID

let schema =mongoose.Schema;

let order = new schema({
	
	OrderNumber:{type: Number, default:0 },

    Tshirts:    [{type:objectId, ref:'Tshirt'}],
	
	DateTime:   {  type: Date, default: Date.now},
	
	CustomerPHN:{type:String ,required:true , default:"there's no phone number" }
	
	
})
module.exports = mongoose.model('Order',order)



