const mongoose = require('mongoose');

// Button Schema for Play Store and Apple Store
const ButtonSchema = new mongoose.Schema({
    downloadLink: { type: String, required: true }, // Download link for the button
    status: { type: Boolean, default: true }, // Status of the button (active/inactive)
}, {
    _id: false // Prevents creating a separate ID for each button
});

// Main Schema
const DownloadAppSchema = new mongoose.Schema({
    downloadAppSection: {
        title: { type: String, required: true }, // Title for the section
        subTitle: { type: String, required: true }, // Subtitle for the section
        image: { type: String, required: true }, // Image for the section
    },
    playStoreButton: { type: ButtonSchema, required: true }, // Play Store button details
    appleStoreButton: { type: ButtonSchema, required: true }, // Apple Store button details
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false // Removes the __v field
});

module.exports = mongoose.model('DownloadApp', DownloadAppSchema);
