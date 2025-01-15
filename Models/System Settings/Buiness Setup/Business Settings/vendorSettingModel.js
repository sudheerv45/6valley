const mongoose = require('mongoose');

const VendorSettingsSchema = new mongoose.Schema({
    defaultCommissions: { type: Number, required: true }, // Commission percentage or value
    enablePOSInVendorPanel: { type: Boolean, default: false }, // Enable POS
    vendorRegistration: { type: Boolean, default: false }, // Allow vendor registration
    setMinimumOrderAmount: { type: Boolean, default: false }, // Set minimum order amount
    vendorCanReplyOnReview: { type: Boolean, default: false }, // Vendor can reply to reviews
    forgotPasswordVerificationBy: { type: String, enum: ['email', 'otp'], required: true }, // Verification type
    newProduct: { type: Boolean, default: false }, // Enable new product option
    productWiseShippingCost: { type: Boolean, default: false }, // Enable product-wise shipping
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Add createdAt and updatedAt fields
    versionKey: false, // Remove __v field
});

module.exports = mongoose.model('VendorSettings', VendorSettingsSchema);
