const express=require ('express');
const mongoose=require('mongoose');
const app = express();
const cors=require('cors');
const FoodModel= require("./models/food");


//this will allow us to use data from frontend in json format.
app.use(express.json());

//to connect frontend and backend we use cors
app.use(cors());

//mongoose connectivity with db
mongoose.connect("mongodb+srv://ashwini123:ashwini123@cluster0.8rmcj.mongodb.net/food?retryWrites=true&w=majority",{useUnifiedTopology: true,useNewUrlParser: true});

//Route started.
//Insert any element in foods collection.
//Create any data.
app.post("/insert", async(req,res)=>
{

const foodName = req.body.foodName;//req.body.foodName is the data coming from frontend which get stored in variable const foodName
const days=req.body.days; //req.body.days is the data coming from frontend which get stored in variable const days.
const food=new FoodModel({foodName:foodName,daysSinceIAte:days});

try 
{
  await food.save();
  res.send("inserted data");
} 
catch (error) {
   console.log(err); 
}
});

//Read element in foods collection.
//Read any data.
app.get("/read", async(req,res)=>
{
  FoodModel.find({},(err,result)=>
{
  if(err){res.send(err)}
  res.send(result);
})

//Update any element in foods collection.
//Update any data.
app.put("/update", async(req,res)=>
{

const newFoodName = req.body.newFoodName;//req.body.newFoodName is the data coming from frontend which get stored in variable const newFoodName
const id=req.body.id; //req.body.id is the data coming from frontend which get stored in variable const id.
try 
{
  await FoodModel.findById(id,(err,updateFood)=>{
    updateFood.foodName=newFoodName;
    updateFood.save();
    res.send('update');
  })
} 
catch (error) {
   console.log(err); 
}
});

//Delete any data from database
app.delete("/delete/:id",async(req,res)=>
{
  const _id=req.params.id;
  await FoodModel.findByIdAndRemove(_id).exec();
  res.send("deleted");
})

});





//creating server and listening it to port 3001
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
