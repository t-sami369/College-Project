const express=require("express");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userRouter= express.Router();
userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);

module.exports=userRouter;