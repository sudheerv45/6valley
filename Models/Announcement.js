const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    backgroundColor: { type: String, required: true }, // e.g., "#FFFFFF" for white
    textColor: { type: String, required: true }, // e.g., "#000000" for black
    text: {
      type: String,
      required: true,
      minlength: [5, "Text must be at least 5 characters long"], // Ensuring some minimum length
      maxlength: [500, "Text must not exceed 500 characters"], // Optional: maximum length
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Announcement", announcementSchema);
