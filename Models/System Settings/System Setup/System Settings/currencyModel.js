const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
    currencyName: {
        type: String,
        required: [true, 'Currency name is required'],
        maxlength: [255, 'Currency name cannot exceed 255 characters'],
    },
    currencySymbol: {
        type: String,
        required: [true, 'Currency symbol is required'],
        maxlength: [10, 'Currency symbol cannot exceed 10 characters'],
    },
    currencyCode: {
        type: String,
        required: [true, 'Currency code is required'],
        unique: true,
        maxlength: [10, 'Currency code cannot exceed 10 characters'],
        match: [/^[A-Z]{3}$/, 'Currency code must be 3 uppercase letters (e.g., USD, EUR)'],
    },
    exchangeRate: {
        type: Number,
        required: [true, 'Exchange rate is required'],
        min: [0, 'Exchange rate cannot be negative'],  // Ensure exchange rate is non-negative
    },
    status: {
        type: Boolean,
        default: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
});

module.exports = mongoose.model('Currency', CurrencySchema);
