// models/AboutUs.js
const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', aboutUsSchema);
