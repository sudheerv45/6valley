const mongoose = require('mongoose');

const ReasonsSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the reason
    shortDescription: { type: String, required: true }, // Short description
    priority: { type: Number, required: true }, // Priority of the reason
    status: { type: Boolean, default: true }, // Active or inactive status
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false // Removes the __v field
});

module.exports = mongoose.model('Reasons', ReasonsSchema);
