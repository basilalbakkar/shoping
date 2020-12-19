const mongoose = require('mongoose')
const objectId=mongoose.Schema.Types.ObjectID
let schema =mongoose.Schema;
let category = new schema({
	
  _id:{type: String ,required:true,default:"No ID"},
	
   name:{type: String ,required:true,default:"NoName"}

})

module.exports = mongoose.model('Category',category)
