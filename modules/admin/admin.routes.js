const express=require("express");
const { viewRequests, handleRequest, monitorUsers } = require("./controllers/userManagement");
const { getStats } = require("./controllers/dashboardStats");
const { getDashboardStats, getEventStatusData, getVisitorStatistics } = require("./controllers/adminDashboard");
const { uploadPostEventMaterials } = require("./controllers/postEventMaterials");

const adminRouter= express.Router();

// adminRouter.use(auth);
adminRouter.get("/view-requests", viewRequests);
adminRouter.post("/handle-request", handleRequest);
adminRouter.get("/monitor-users", monitorUsers);
adminRouter.get("/stats", getStats);
//adminRouter.post("/upload-material", upload.single("material"), uploadPostEventMaterials);
// Dashboard Statistics Route
adminRouter.get("/dashboard/stats", getDashboardStats);

// Event Status Data Route
adminRouter.get("/dashboard/event-status", getEventStatusData);

// Visitor Statistics Route
adminRouter.get("/dashboard/visitor-stats", getVisitorStatistics);

module.exports=adminRouter;