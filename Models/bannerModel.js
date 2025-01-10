const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    bannerType: {
        type: String,
        required: true,
        enum: ["Main Banner", "Popup Banner", "Footer Banner", "Main Section Banner"], // Extendable
    },
    bannerURL: {
        type: String,
        required: true,
    },
    resourceType: {
        type: String,
        required: true,
        enum: ["Product", "Category", "Brand", "Shop"], // Extendable
    },
    resource: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Banner", bannerSchema);