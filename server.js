const express=require('express');
const app=express();
require("dotenv").config({ path: "./config.env" });
const cloudinary=require("cloudinary");
const cors=require("cors");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const cookieParser = require("cookie-parser");
const connectDB=require('./config/db');
const path=require("path");
const PORT=process.env.PORT;

app.use(cookieParser());
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.json())
app.use(cors({ credentials: true }));

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
app.use("/api/v1/auth",require("./routes/authRoutes/authRoute"));
app.use("/api/v1/feed",require("./routes/userRoutes/feedRoute"));
app.use("/api/v1/profile",require("./routes/userRoutes/profileRoute"));
app.use("/api/v1/post",require("./routes/userRoutes/postRoute"));
app.use("/api/v1/reel",require("./routes/userRoutes/reelRoute"));
app.use("/api/v1/requests",require("./routes/userRoutes/requestsRoute"))
app.use("/api/v1/setup",require("./routes/userRoutes/setupRoute"))
app.use("/api/v1/story",require("./routes/userRoutes/storyRoute"));
/*app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*",(req,res)=>{
     res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
})*/

app.listen(PORT,()=>{
 console.log(`server is listening on this port:${PORT}`);
})
