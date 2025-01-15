// File: models/SoftwareUpdate.js

const mongoose = require('mongoose');

const SoftwareUpdateSchema = new mongoose.Schema({
    codecanyonUsername: { type: String, required: true, maxlength: 255 },
    purchaseCode: { type: String, required: true, maxlength: 255 },
    updatedFile: { type: String, required: true }, // File path (for storage)
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('SoftwareUpdate', SoftwareUpdateSchema);
