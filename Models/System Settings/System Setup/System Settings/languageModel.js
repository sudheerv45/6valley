// File: models/Language.js

const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 255 },
    countryCode: { type: String, required: true, maxlength: 5 },
    direction: { type: String, enum: ['LTR', 'RTL'], required: true }, // LTR (Left-to-Right) or RTL (Right-to-Left)
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Remove __v field
});

module.exports = mongoose.model('Language', LanguageSchema);
