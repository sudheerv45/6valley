// models/Vendor.js
const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shopName: { type: String, required: true },
    shopAddress: { type: String, required: true },
    vendorImage: { type: String }, // URL for vendor image
    shopLogo: { type: String },    // URL for shop logo
    shopBanner: { type: String },  // URL for shop banner
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Vendor", vendorSchema);
