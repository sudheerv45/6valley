const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    backgroundColor: { type: String, required: true }, // e.g., "#FFFFFF" for white
    textColor: { type: String, required: true }, // e.g., "#000000" for black
    text: { type: String, required: true }, // The announcement text
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Announcement", announcementSchema);
