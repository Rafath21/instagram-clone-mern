const mongoose=require("mongoose");
async function connectDB(){
    try{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
         useUnifiedTopology:true,
    })
    console.log("database connected!");
}catch(err){
    console.log(err);
}
}
module.exports=connectDB;