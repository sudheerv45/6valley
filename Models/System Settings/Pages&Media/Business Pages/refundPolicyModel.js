// models/RefundPolicy.js
const mongoose = require('mongoose');

const refundPolicySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('RefundPolicy', refundPolicySchema);
