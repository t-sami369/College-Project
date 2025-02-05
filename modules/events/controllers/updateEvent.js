const Event = require("../../../models/events.model");
const fs = require('fs');
const path = require('path');

const updateEvent = async (req, res) => {
  // const { id } = req.params; // Event ID from URL
  const { id,title, description, date } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) throw new Error("Event not found!");

    // Handle image update
    let imagePath = event.image;
    if (req.file) {
        // Delete old image if exists
        if (event.image) {
            const oldImagePath = path.join(__dirname, '../../../', event.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        imagePath = `/uploads/events/${req.file.filename}`;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date,
        ...(imagePath && { image: imagePath })
       },
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
