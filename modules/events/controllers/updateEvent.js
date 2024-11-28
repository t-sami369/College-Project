const Event = require("../../../models/events.model");

const updateEvent = async (req, res) => {
  // const { id } = req.params; // Event ID from URL
  const { id,title, description, date } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true } // Returns the updated document
    );

    if (!updatedEvent) throw new Error("Event not found!");

    res.status(200).json({
      status: "success",
      message: "Event updated successfully!",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

module.exports = updateEvent;
