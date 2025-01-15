const mongoose = require('mongoose');

const WhySellWithUsSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the section
    subTitle: { type: String, required: true }, // Sub-title of the section
    image: { type: String, required: true }, // Path or URL of the uploaded image
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false // Removes the __v field
});

module.exports = mongoose.model('WhySellWithUs', WhySellWithUsSchema);
