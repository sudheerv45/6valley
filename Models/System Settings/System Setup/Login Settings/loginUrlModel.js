const mongoose = require('mongoose');

const LoginUrlSchema = new mongoose.Schema({
    pageType: { type: String, required: true },   // Page type (e.g., "login", "forgot password", etc.)
    urlType: { type: String, required: true },    // Type of URL (e.g., "relative" or "absolute")
    url: { type: String, required: true },         // URL
    deleted: { type: Boolean, default: false },    // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Remove __v field
});

module.exports = mongoose.model('LoginUrl', LoginUrlSchema);
