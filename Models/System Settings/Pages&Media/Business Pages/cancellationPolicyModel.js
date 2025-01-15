// models/CancellationPolicy.js
const mongoose = require('mongoose');

const cancellationPolicySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('CancellationPolicy', cancellationPolicySchema);
