const Event = require("../../../models/events.model");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer", "name email");
    res.status(200).json({
      status: "success",
      events,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

module.exports = getEvents;
