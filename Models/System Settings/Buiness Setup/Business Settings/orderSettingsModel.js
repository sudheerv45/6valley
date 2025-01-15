const mongoose = require('mongoose');

const OrderSettingsSchema = new mongoose.Schema(
    {
        orderDeliveryVerification: { type: Boolean, default: true },
        minimumOrderAmount: { type: Boolean, default: false },
        showBillingAddressInCheckout: { type: Boolean, default: true },
        freeDelivery: { type: Boolean, default: false },
        freeDeliveryResponsibility: {
            type: String,
            enum: ['admin', 'vendor'],
            required: true,
        },
        freeDeliveryOver: { type: Number, default: 0 },
        refundOrderValidityDays: { type: Number, default: 30 },
        guestCheckout: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false }, // Soft delete flag
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false, // Removes __v field
    }
);

module.exports = mongoose.model('OrderSettings', OrderSettingsSchema);
