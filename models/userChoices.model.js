const mongoose = require("mongoose");

const userChoiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
    required: true
  },
  choice: {
    type: String,
    enum: ["like", "dislike"],
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure one choice per user per event
userChoiceSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const UserChoice = mongoose.model("userChoices", userChoiceSchema);

module.exports = UserChoice;