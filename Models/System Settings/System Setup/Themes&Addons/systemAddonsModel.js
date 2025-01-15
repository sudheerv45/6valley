const mongoose = require('mongoose');

const SystemAddonsSchema = new mongoose.Schema({
    uploadAddons: { type: String, required: true }, // Path or URL for uploaded addon file
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false // Removes the __v field
});

module.exports = mongoose.model('SystemAddons', SystemAddonsSchema);
