const mongoose = require('mongoose');

const ThemeSetupSchema = new mongoose.Schema({
    uploadTheme: { type: String, required: true }, // Path or URL of the uploaded theme file
    deleted: { type: Boolean, default: false },    // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false // Removes the __v field
});

module.exports = mongoose.model('ThemeSetup', ThemeSetupSchema);
