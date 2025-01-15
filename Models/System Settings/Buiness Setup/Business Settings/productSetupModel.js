const mongoose = require('mongoose');

const ProductSetupSchema = new mongoose.Schema({
    reorderLevel: { type: Number, required: true },
    sellDigitalProduct: { type: Boolean, default: false },
    showBrand: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
});

module.exports = mongoose.model('ProductSetup', ProductSetupSchema);
