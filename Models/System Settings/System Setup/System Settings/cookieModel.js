// File: models/Cookie.js

const mongoose = require('mongoose');

const CookieSchema = new mongoose.Schema({
    status: { type: Boolean, default: true }, // Active or Inactive
    cookieText: { type: String, required: true, maxlength: 500 },
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Remove __v field
});

module.exports = mongoose.model('Cookie', CookieSchema);
