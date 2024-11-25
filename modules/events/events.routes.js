const express=require("express");
const createEvent = require("./controllers/createEvent");
const auth = require("../../middlewares/auth");
const deleteEvent = require("./controllers/deleteEvent");
const updateEvent = require("./controllers/updateEvent");
const getEvent = require("./controllers/getEvents");

const eventRouter = express.Router();
eventRouter.get("/",getEvent);


//protected routes for event management
eventRouter.use(auth);
eventRouter.post("/create",createEvent);
eventRouter.delete("/delete",deleteEvent);
eventRouter.patch("/update",updateEvent);

module.exports=eventRouter;