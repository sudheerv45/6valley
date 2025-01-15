const mongoose = require('mongoose');

// Schema for Invoice Settings
const InvoiceSettingsSchema = new mongoose.Schema({
    termsAndConditions: { type: String, required: true }, // Terms and conditions
    businessIdentity: { type: String, required: true }, // Business identity like Tax ID, BIN number, MUSAK, etc.
    businessIdentityType: { type: String, enum: ['Tax ID', 'BIN Number', 'MUSAK'], required: true }, // Type of business identity
    invoiceLogo: { type: String }, // Invoice logo (accepts file path)
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes the __v field
});

module.exports = mongoose.model('InvoiceSettings', InvoiceSettingsSchema);
