const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    bannerType: {
        type: String,
        required: [true, "Banner type is required."],
        enum: {
            values: ["Main Banner", "Popup Banner", "Footer Banner", "Main Section Banner"], // Extendable
            message: "Invalid banner type. Choose from: Main Banner, Popup Banner, Footer Banner, Main Section Banner.",
        },
        trim: true,
    },
    bannerURL: {
        type: String,
        required: [true, "Banner URL is required."],
        trim: true,
        validate: {
            validator: function (value) {
                return /^(http[s]?:\/\/.*)|(\/.*\.(?:png|jpg|jpeg|svg|gif))$/.test(value);
            },
            message: "Banner URL must be a valid URL or a valid image file path.",
        },
    },
    resourceType: {
        type: String,
        required: [true, "Resource type is required."],
        enum: {
            values: ["Product", "Category", "Brand", "Shop"], // Extendable
            message: "Invalid resource type. Choose from: Product, Category, Brand, Shop.",
        },
        trim: true,
    },
    resource: {
        type: String,
        required: [true, "Resource is required."],
        trim: true,
        validate: {
            validator: function (value) {
                return /^[A-Za-z0-9\s\-_,.]+$/.test(value); // Allows alphanumeric, spaces, and some common characters
            },
            message: "Resource can only contain alphanumeric characters, spaces, and '-', '_', ',', or '.'.",
        },
    },
    imagePath: {
        type: String,
        required: [true, "Image path is required."],
        trim: true,
        validate: {
            validator: function (value) {
                return /\.(png|jpg|jpeg|svg|gif)$/.test(value);
            },
            message: "Image path must point to a valid image file (png, jpg, jpeg, svg, gif).",
        },
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Banner", bannerSchema);
