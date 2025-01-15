const mongoose = require('mongoose');

const PaymentOptionsSchema = new mongoose.Schema({
    cashOnDelivery: { type: Boolean, default: false },
    digitalPayment: { type: Boolean, default: false },
    offlinePayment: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
});

module.exports = mongoose.model('PaymentOptions', PaymentOptionsSchema);
