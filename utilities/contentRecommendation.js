const mongoose = require('mongoose');
const UserChoice = require('../models/userChoices.model');
const Event = require('../models/events.model');
const ContentBasedRecommender = require('content-based-recommender');

const recommender = new ContentBasedRecommender({
    minScore: 0.09,
    maxSimilarDocuments: 100
});

async function getEventRecommendations(userId) {
    try {
    
        // 1. Get user's liked events
        const likedEvents = await UserChoice.aggregate([
            {
                $match: {
                    userId: userId, 
                    choice: "like"
                }
            },
            {
                $lookup: {
                    from: "events",
                    let: { eventId: "$eventId" },
                    pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$eventId" }]
                                },
                      
                            }
                        },
                  { $project: { __v: 0 } } // Removes unnecessary fields from events
                ],
                as: "eventDetails"
              }
            
            },
            { $unwind: "$eventDetails" },
            {
                $project: {  // Only returns needed fields
                    _id: 1,
                    eventDetails: 1
                }
            }
        ]);
        

        // 2. Get upcoming events
        const upcomingEvents = await Event.find({
            status: { $in: ['active', 'pending', 'completed'] }
        });


        // 3. Prepare and train recommender
        const documents = upcomingEvents.map(event => ({
            id: event._id.toString(),
            content: event.title || ''
        }));
        recommender.train(documents);

        // 4. Get and process recommendations
        const likedEventIds = new Set(likedEvents.map(e => e.eventDetails._id.toString()));
        let allRecommendations = [];
        for (const likedEvent of likedEvents) {
            const similar = recommender.getSimilarDocuments(
                likedEvent.eventDetails._id.toString(),
                0,
                5
            );
            allRecommendations.push(...similar);
        }

        // 5. Calculate final scores and sort
        const scoredRecommendations = allRecommendations
            .filter(rec => !likedEventIds.has(rec.id))
            .map(rec => {
                const event = upcomingEvents.find(e => e._id.toString() === rec.id);
                return {
                    ...rec,
                    event,
                    finalScore: rec.score * (event.status === 'active' ? 1.5 : 1.0)
                };
            })
            .sort((a, b) => b.finalScore - a.finalScore)
            .slice(0, 10)
            .map(({ event, finalScore }) => ({
                event,
                score: finalScore
            }));

        return scoredRecommendations;

    } catch (error) {
        console.error("Error getting recommendations:", error);
        throw error;
    }
}

module.exports = { getEventRecommendations };