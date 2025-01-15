const mongoose = require('mongoose');

const VendorRegistrationHeaderSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the vendor registration header
    subTitle: { type: String, required: true }, // Sub-title of the vendor registration header
    image: { type: String, required: true }, // Path or URL of the uploaded image
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false // Removes the __v field
});

module.exports = mongoose.model('VendorRegistrationHeader', VendorRegistrationHeaderSchema);
