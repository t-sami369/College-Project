const express=require("express");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const auth = require("../../middlewares/auth");
const adminDashboard = require("./controllers/adminDashboard");
const userRouter= express.Router();
userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);
//Protected routes
userRouter.use(auth);
userRouter.get("/dashboard",adminDashboard);

module.exports=userRouter;