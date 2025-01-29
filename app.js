const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const userRouter = require("./modules/users/users.routes");
const eventRouter = require("./modules/events/events.routes");
const adminRouter = require("./modules/admin/admin.routes");

//Utility routes
const recommendationRouter = require("./utilities/utilities.routes");
const { scheduleReminders } = require('./utilities/notificationService');

require("dotenv").config();

mongoose.connect(process.env.mongo_connect, {}).then(() => {
    console.log("Connection to database successful!");
}).catch((e) => {
    console.log("Connection to database failed!", e);
});

app.use("/users", userRouter);
app.use("/events", eventRouter);
app.use("/admin", adminRouter);
app.use("/api",recommendationRouter);


// Start reminder service
scheduleReminders();

app.listen(8000, () => {
    console.log("Server started successfully!");
});