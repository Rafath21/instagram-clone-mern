const express=require('express');
const app=express();
const cloudinary=require("cloudinary");
const cors=require("cors");
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "./config.env" });
    app.use(cors());
}
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const cookieParser = require("cookie-parser");
const connectDB=require('./config/db');
const path=require("path");
const PORT=process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

 
app.use(cookieParser());
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.json())

connectDB();
app.use("/api/v1/auth",require("./routes/authRoutes/authRoute"));
app.use("/api/v1/feed",require("./routes/userRoutes/feedRoute"));
app.use("/api/v1/profile",require("./routes/userRoutes/profileRoute"));
app.use("/api/v1/post",require("./routes/userRoutes/postRoute"));
app.use("/api/v1/reel",require("./routes/userRoutes/reelRoute"));
app.use("/api/v1/requests",require("./routes/userRoutes/requestsRoute"))
app.use("/api/v1/setup",require("./routes/userRoutes/setupRoute"))
app.use("/api/v1/story",require("./routes/userRoutes/storyRoute"));
app.use("/api/v1/activity",require("./routes/userRoutes/activityRoute"));
app.use("/api/v1/suggestions",require("./routes/userRoutes/suggestionRoute"));
app.use("/api/v1/users",require('./routes/userRoutes/usersRoute'));
app.use("/api/v1/chats",require("./routes/userRoutes/chatRoute"));
app.use("/api/v1/messages",require("./routes/userRoutes/messagesRoute"));
app.use("/api/v1/delete",require("./routes/userRoutes/deleteUserRoute"));

app.use(express.static(path.join(__dirname,"./frontend/build")));
app.get("*",(req,res)=>{
     res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
})

app.listen(PORT,()=>{
 console.log(`server is listening on this port:${PORT}`);
})

