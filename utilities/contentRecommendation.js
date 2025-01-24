const mongoose = require('mongoose');
const UserChoice = require('../models/userChoices.model');
const Event = require('../models/events.model');
const ContentBasedRecommender = require('content-based-recommender');

const recommender = new ContentBasedRecommender({
    minScore: 0.4,
    maxSimilarDocuments: 100
});

async function getEventRecommendations(userId) {
    try {
        // 1. Get user's liked events
        const likedEvents = await UserChoice.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    choice: "like"
                }
            },
            {
                $lookup: {
                    from: "events",
                    localField: "eventId",
                    foreignField: "_id",
                    as: "eventDetails"
                }
            },
            {
                $unwind: "$eventDetails"
            }
        ]);

        // 2. Get all events for training
        const allEvents = await Event.find({});
        
        // 3. Prepare documents for training
        const documents = allEvents.map(event => ({
            id: event._id.toString(),
            content: `${event.name} ${event.description || ''}`
        }));

        // 4. Train recommender
        recommender.train(documents);

        // 5. Get recommendations based on each liked event
        const recommendations = [];
        const likedEventIds = new Set(likedEvents.map(e => e.eventDetails._id.toString()));

        for (const likedEvent of likedEvents) {
            const similar = recommender.getSimilarDocuments(
                likedEvent.eventDetails._id.toString(),
                0,
                5
            );
            
            // Filter out already liked events
            const filtered = similar.filter(rec => !likedEventIds.has(rec.id));
            recommendations.push(...filtered);
        }

        return recommendations;
    } catch (error) {
        console.error("Error getting recommendations:", error);
        throw error;
    }
}

module.exports = { getEventRecommendations };