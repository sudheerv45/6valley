const mongoose = require('mongoose');

const ShippingDetailsSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the shipping method
    duration: { type: String, required: true }, // Estimated delivery duration
    cost: { type: Number, required: true }, // Cost of the shipping
    status: { type: Boolean, default: true }, // Active/Inactive status
}, {
    _id: false, // Embedded schema
});

const ShippingMethodSchema = new mongoose.Schema({
    shippingResponsibility: {
        type: String,
        enum: ['inhouse shipping', 'vendor wise shipping'],
        required: true,
    },
    shippingMethodForInhouse: {
        type: String,
        enum: ['order wise', 'category wise', 'product wise'],
        required: true,
    },
    shippingDetails: { type: [ShippingDetailsSchema], default: [] }, // Array of shipping details
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
});

module.exports = mongoose.model('ShippingMethod', ShippingMethodSchema);
