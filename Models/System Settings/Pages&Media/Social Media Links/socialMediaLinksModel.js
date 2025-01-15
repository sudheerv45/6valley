const mongoose = require('mongoose');

const SocialMediaLinksSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the social media platform
    socialMediaLink: { type: String, required: true }, // URL of the social media link
    status: { type: Boolean, default: true }, // Active or inactive status
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false // Removes the __v field
});

module.exports = mongoose.model('SocialMediaLinks', SocialMediaLinksSchema);
