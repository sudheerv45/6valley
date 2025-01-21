const mongoose = require('mongoose');

const ShippingDetailsSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: [true, 'Shipping method title is required'], 
            trim: true, 
            maxlength: [255, 'Title cannot exceed 255 characters'] 
        }, // Title of the shipping method
        duration: { 
            type: String, 
            required: [true, 'Estimated delivery duration is required'], 
            trim: true, 
            maxlength: [100, 'Duration cannot exceed 100 characters'] 
        }, // Estimated delivery duration
        cost: { 
            type: Number, 
            required: [true, 'Shipping cost is required'], 
            min: [0, 'Shipping cost cannot be negative'] 
        }, // Cost of the shipping
        status: { 
            type: Boolean, 
            default: true 
        }, // Active/Inactive status
    },
    {
        _id: false, // Embedded schema
    }
);

const ShippingMethodSchema = new mongoose.Schema(
    {
        shippingResponsibility: {
            type: String,
            enum: {
                values: ['inhouse shipping', 'vendor wise shipping'],
                message: 'Shipping responsibility must be either "inhouse shipping" or "vendor wise shipping"',
            },
            required: [true, 'Shipping responsibility is required'],
        },
        shippingMethodForInhouse: {
            type: String,
            enum: {
                values: ['order wise', 'category wise', 'product wise'],
                message: 'Shipping method must be "order wise", "category wise", or "product wise"',
            },
            required: [true, 'Shipping method for inhouse is required'],
        },
        shippingDetails: { 
            type: [ShippingDetailsSchema], 
            default: [] 
        }, // Array of shipping details
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

module.exports = mongoose.model('ShippingMethod', ShippingMethodSchema);
