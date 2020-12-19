const app= require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let Tshirt=require('./model/tshirt.js')
let Category=require('./model/category.js')
let Order=require('./model/order.js')

app.use(bodyParser.urlencoded({extended:false,useNewUrlParser:true}))
app.use(bodyParser.json())
const db=mongoose.connect('mongodb://localhost/thoping',{useNewUrlParser:true,useUnifiedTopology:true})



app.post('/category', function(req,res){
    
    let NewCategory = new Category()
   
	NewCategory._id = req.body._id;
    NewCategory.name = req.body.name;
	
    NewCategory.save(function(err,SavedCategory){
        
		if (err){res.status(500).send({error:"Coudn't add Category"})}
		
		else{ res.send(SavedCategory) }
	
    })
})
app.get('/category', function(req,res){
    Category.find({} , function(err,Categorys){
        
		if (err){res.status(500).send({error:"Coudn't get Category"})}
		
		else{res.send(Categorys)}
    })
})
//////////////////////////////////////////////////////////////////////////////////

app.post('/tshirt', function(req,res){
    
    let NewTshirt = new Tshirt()
    NewTshirt._id = req.body._id;
    NewTshirt.name = req.body.name;
    NewTshirt.tprice = req.body.tprice;
    NewTshirt.numberItem = req.body.numberItem;
	
	
    NewTshirt.save(function(err,SavedTshirt){
        
		if (err){res.status(500).send({error:"Coudn't add Tshirt"})}
		
		else{ res.send(SavedTshirt) }
	
    })
})


/////////////////////////////////////////
app.put('/category/tshirt/add', function(req,res){
   
	let tshirtID=req.body.tshirtID
    let categoryID=req.body.categoryID
	
     Category.findOne({_id :categoryID},function(err,category){

		
		 if (err) { res.status(500).send( {error:"Coudn't find category"} ) }
		 
		
		 else{Tshirt.updateOne({ _id:tshirtID } , { $addToSet : {categorys:category._id}  } , function(err,status)
			
			{	
			 if (err){res.status(500).send({error:"Coudn't find Tshirt"})	}
				
			 else{ res.send(status) }
		    })
	 }
})
})

/////////////////////////////////////////


app.get('/tshirt', function(req,res){
	Tshirt.find({}).populate(
		{
		
		path:'categorys' ,
		model:'Category',
        select:"_id"
		
		
	}).exec(function(error,tshirts){
			
		if (error){ res.status(500).send({error:"Coudn't find tshirts"})}
		   
		else{ res.send(tshirts)	}   
		
	})
})

//////////////////////////////////////////////////////////////////////////////




app.post('/order', function(req,res){
    
    let NewOrder = new Order()
  
    NewOrder.OrderNumber = req.body.OrderNumber;
    NewOrder.CustomerPHN = req.body.CustomerPHN;
    NewOrder.save(function(err,SavedOrder){
        
		if (err){res.status(500).send({error:"Coudn't add Order"})}
		
		else{ res.send(SavedOrder) }
	
    })
    
    
})
/////////////////////////////////////////////
app.put('/order/numberItem', function(req,res){
    
    
	let otshirtID=req.body.otshirtID;
	let orderID=req.body.orderId;
    
	


     Tshirt.findOne({_id:otshirtID},function(err,idtshhirt){
		 
		 
	
		 if (err) { res.status(500).send( {error:"Coudn't find catTshirtegory"} ) }
		 
		
else{Tshirt.updateOne({} , {$inc: {numberItem: -1}} , function(err,status)
			
			{	
			 if (err){res.status(500).send({error:"Coudn't find Order"})	}
				
			 else{ res.send(status)}
		    })

	 }
})
})
///////////////////////////////////
app.put('/order/tshirt/add', function(req,res){
    
    
	let otshirtID=req.body.otshirtID;
	let orderID=req.body.orderId;
    
  Tshirt.findOne({_id :otshirtID},function(err,otshirt){

		
		 if (err) { res.status(500).send( {error:"Coudn't find category"} ) }
		 
		
		 else{Order.updateOne({ _id:orderID } , { $addToSet : {Tshirts:otshirt._id}  } , function(err,status)
			
			{	
			 if (err){res.status(500).send({error:"Coudn't find Tshirt"})	}
				
			 else{ res.send(status) }
		    })
	 }
})
})



/////////////////////////////////////

app.get('/order', function(req,res){
	Order.find({}).populate(
		{
	    path:'Tshirts' ,
	 	model:'Tshirt',
		select:"_id=1"
		
	}).exec(function(error,orders){
			
		if (error){ res.status(500).send({error:"Coudn't find orders"})}
		   
		else{ res.send(orders)	}   
		
	})
})
/////////////////////////////////////
app.listen(3000,()=>{
console.log('server connected.....');
});