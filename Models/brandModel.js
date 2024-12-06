const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema(
    {
        brandName: {
            type: String,
            required: true,
        },
        imageAltText: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true, // Store the file path or URL
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Brand', BrandSchema);
