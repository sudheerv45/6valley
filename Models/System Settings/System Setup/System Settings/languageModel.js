const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Language name is required'],
        maxlength: [255, 'Language name cannot exceed 255 characters'],
    },
    countryCode: {
        type: String,
        required: [true, 'Country code is required'],
        maxlength: [5, 'Country code cannot exceed 5 characters'],
        match: [/^[A-Za-z]{2,5}$/, 'Country code must be alphabetic and between 2 to 5 characters'], // Ensuring it’s a valid country code format
    },
    direction: {
        type: String,
        enum: ['LTR', 'RTL'],
        required: [true, 'Language direction (LTR or RTL) is required'],
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
});

module.exports = mongoose.model('Language', LanguageSchema);
