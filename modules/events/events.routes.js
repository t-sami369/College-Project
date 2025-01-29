const express=require("express");
const createEvent = require("./controllers/createEvent");
const {auth,roleAuth} = require("../../middlewares/auth");
const deleteEvent = require("./controllers/deleteEvent");
const updateEvent = require("./controllers/updateEvent");
const getEvent = require("./controllers/getEvents");


const eventRouter = express.Router();
eventRouter.get("/",getEvent);


//protected routes for event management
eventRouter.use(auth);
eventRouter.post("/create", roleAuth(['organizer','admin']), createEvent);
eventRouter.delete("/delete", roleAuth(['organizer','admin']), deleteEvent);
eventRouter.patch("/update", roleAuth(['organizer','admin']), updateEvent);

module.exports=eventRouter;