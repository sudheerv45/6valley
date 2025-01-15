const mongoose = require('mongoose');

const OSTypeSchema = new mongoose.Schema({
    ostype: { type: String, required: true },
    appversion: { type: String, required: true },
    downloadurl: { type: String, required: true },
});

const AppSettingsSchema = new mongoose.Schema({
    category: { type: String, required: true }, // Changed from 'ostype' to 'category' for clarity
    ostypes: [OSTypeSchema],
    deleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('AppSettings', AppSettingsSchema);
