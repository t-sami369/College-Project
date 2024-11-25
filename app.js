const express= require("express");
const app = express();
app.use(express.json());
const userModel=require("./models/users.model");
const mongoose= require("mongoose");
const userRouter = require("./modules/users/users.routes");
const eventRouter = require("./modules/events/events.routes");
require("dotenv").config();

mongoose.connect(process.env.mongo_connect,{}).then(()=>{
    console.log("Connection to database successful!");
}).catch((e)=>{
    console.log("Connection to database failed!",e);
});
app.use("/users",userRouter);
app.use("/events",eventRouter);

app.listen(8000,()=>{
  console.log("Server started successfully!");
});