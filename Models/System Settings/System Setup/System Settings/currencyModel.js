// File: models/Currency.js

const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
    currencyName: { type: String, required: true, maxlength: 255 },
    currencySymbol: { type: String, required: true, maxlength: 10 },
    currencyCode: { type: String, required: true, unique: true, maxlength: 10 },
    exchangeRate: { type: Number, required: true },
    status: { type: Boolean, default: true }, // Active or Inactive
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Remove __v field
});

module.exports = mongoose.model('Currency', CurrencySchema);
