const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")

const app=express()
app.use(cors())

mongoose.connect("mongodb://localhost:27017/GeoSpatial",()=>{console.log("successfully connected to database")})

const restaurant_schema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    serves:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    location:{
        type:Array,
        required:true
    }
})

const restaurant= new mongoose.model("restaurants",restaurant_schema)

app.get("/Restaurants",async(req,res)=>{

    const options={
        location:{
            $geowithin:{
                $centersphere:[[23.755339,90.375408], 15/3963.2]
            }
        }
    }
   const data= await restaurant.find(options)
//    console.log(data)
   res.send(data)
    // res.send("success")
})

app.listen(8000,()=>{console.log("server is running on port 8000")})