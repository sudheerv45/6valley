const mongoose = require('mongoose');

// Schema for FAQ
const VendorRegistrationFaqSchema = new mongoose.Schema({
    question: { type: String, required: true }, // Question text
    answer: { type: String, required: true }, // Answer text
    priority: { type: Number, required: true }, // Priority of the FAQ
    status: { type: Boolean, default: true }, // Status: Active or Inactive
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes the __v field
});

module.exports = mongoose.model('VendorRegistrationFaq', VendorRegistrationFaqSchema);
