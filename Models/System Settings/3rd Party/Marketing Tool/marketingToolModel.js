const mongoose = require('mongoose');

const marketingToolSchema = new mongoose.Schema({
    platformName: {
        type: String,
        required: true, // e.g., "Google Ads"
        match: [/^[A-Za-z\s]+$/, "Platform Name must only contain alphabets"],
    },
    platformId: {
        type: String,
        required: true, // e.g., "12345-ABC"
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('MarketingTool', marketingToolSchema);
