const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    fileName: { type: String, required: true }, // Name of the file
    uploadFile: { type: String, required: true }, // Path or URL of the uploaded file
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false // Removes the __v field
});

module.exports = mongoose.model('Gallery', GallerySchema);
