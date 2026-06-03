const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    suggestions: {
      type: [String],
      default: [],
    },

    suggestionTriggered: {
      type: Boolean,
      default: false,
    },

    suggestedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Todo", todoSchema);