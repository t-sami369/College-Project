const express = require("express");
const {auth,roleAuth} = require("../middlewares/auth");
const { getEventRecommendations } = require("../utilities/contentRecommendation");

const recommendationRouter = express.Router();

// Protected recommendation routes
recommendationRouter.use(auth,roleAuth(['organizer','admin', 'user']));

// Get personalized event recommendations
recommendationRouter.get("/events", async (req, res) => {
    try {

        const recommendations = await getEventRecommendations(req.user.id);

        res.status(200).json({
            status: "success",
            recommendations
        });
    } catch (error) {
        console.error("Error:", error); // Debugging error

        res.status(400).json({
            status: "failed",
            error: error.message
        });
    }
});

module.exports = recommendationRouter;