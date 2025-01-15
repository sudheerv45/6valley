const mongoose = require('mongoose');

// Schema for Delivery Man Settings
const DeliveryManSettingsSchema = new mongoose.Schema({
    uploadPictureOnDelivery: { type: Boolean, required: true }, // Store true or false
    forgotPasswordVerificationBy: { type: String, enum: ['Email', 'Phone (OTP)'], required: true }, // Accept only 'Email' or 'Phone (OTP)'
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes the __v field
});

module.exports = mongoose.model('DeliveryManSettings', DeliveryManSettingsSchema);
