// models/ShippingPolicy.js
const mongoose = require('mongoose');

const shippingPolicySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('ShippingPolicy', shippingPolicySchema);
