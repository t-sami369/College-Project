const express=require("express");
const createEvent = require("./controllers/createEvent");
const {auth,roleAuth} = require("../../middlewares/auth");
const deleteEvent = require("./controllers/deleteEvent");
const updateEvent = require("./controllers/updateEvent");
const getEvent = require("./controllers/getEvents");
const registerEvent = require("./controllers/registerEvent");
const rateEvent = require("./controllers/rateEvent");


const eventRouter = express.Router();
eventRouter.get("/",getEvent);


//protected routes for event management
eventRouter.use(auth);
eventRouter.post("/create", roleAuth(['organizer','admin']), createEvent);
eventRouter.delete("/delete", roleAuth(['organizer','admin']), deleteEvent);
eventRouter.patch("/update", roleAuth(['organizer','admin']), updateEvent);
eventRouter.post("/register", auth, registerEvent);
eventRouter.post("/rate", auth, rateEvent);

module.exports=eventRouter;