const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Reference to the Customer table
        required: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to the Product table
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    totalItems: {
        type: Number,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    itemsDiscount: {
        type: Number,
        required: false,
        default: 0,
    },
    couponDiscount: {
        type: Number,
        required: false,
        default: 0,
    },
    extraDiscount: {
        type: Number,
        required: false,
        default: 0,
    },
    discountedAmount: {
        type: Number,
        required: true,
    },
    vatTax: {
        type: Number,
        required: true,
    },
    shipping: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        required: true,
        default: 'unpaid',
    },
    orderStatus: {
        type: String,
        enum: [
            'pending',
            'confirmed',
            'packaging',
            'out for delivery',
            'delivered',
            'returned',
            'failed to deliver',
            'cancelled',
        ],
        required: true,
        default: 'pending',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
