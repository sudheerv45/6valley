const mongoose = require('mongoose');

const OrderSettingsSchema = new mongoose.Schema(
    {
        orderDeliveryVerification: { 
            type: Boolean, 
            default: true 
        },
        minimumOrderAmount: { 
            type: Boolean, 
            default: false 
        },
        showBillingAddressInCheckout: { 
            type: Boolean, 
            default: true 
        },
        freeDelivery: { 
            type: Boolean, 
            default: false 
        },
        freeDeliveryResponsibility: {
            type: String,
            enum: ['admin', 'vendor'],
            required: function () {
                return this.freeDelivery; // Required if freeDelivery is true
            },
            message: 'Free delivery responsibility is required when free delivery is enabled',
        },
        freeDeliveryOver: { 
            type: Number, 
            default: 0,
            min: [0, 'Free delivery threshold must be 0 or greater'], 
        },
        refundOrderValidityDays: { 
            type: Number, 
            default: 30,
            min: [0, 'Refund order validity days must be 0 or greater'],
            max: [365, 'Refund order validity days cannot exceed 365'],
        },
        guestCheckout: { 
            type: Boolean, 
            default: true 
        },
        deleted: { 
            type: Boolean, 
            default: false 
        }, // Soft delete flag
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false, // Removes __v field
    }
);

module.exports = mongoose.model('OrderSettings', OrderSettingsSchema);
