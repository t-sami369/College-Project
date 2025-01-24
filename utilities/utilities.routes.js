const express = require("express");
const auth = require("../../middlewares/auth");
const { getEventRecommendations } = require("../../utilities/contentRecommendation");

const recommendationRouter = express.Router();

// Protected recommendation routes
recommendationRouter.use(auth);

// Get personalized event recommendations
recommendationRouter.get("/events", async (req, res) => {
    try {
        const recommendations = await getEventRecommendations(req.user.id);
        res.status(200).json({
            status: "success",
            recommendations
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: error.message
        });
    }
});

module.exports = recommendationRouter;