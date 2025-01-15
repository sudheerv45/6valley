// models/ReturnPolicy.js
const mongoose = require('mongoose');

const returnPolicySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('ReturnPolicy', returnPolicySchema);
