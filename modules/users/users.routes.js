const express=require("express");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const auth = require("../../middlewares/auth");

const userRouter= express.Router();
userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);
//Protected routes
// userRouter.use(auth);
// router.post("/create", roleAuth(['organizer']), createEvent);
// router.put("/update/:id", roleAuth(['organizer']), updateEvent);
// router.delete("/delete/:id", roleAuth(['organizer']), deleteEvent);
//userRouter.get("/dashboard",adminDashboard);

module.exports=userRouter;