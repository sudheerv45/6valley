const mongoose = require('mongoose');

// Section Schema
const SectionSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the section
    shortDescription: { type: String, required: true }, // Short description
    image: { type: String, required: true }, // Image URL or file path
}, {
    _id: false // Prevents creating a separate ID for each section
});

// Business Process Schema
const BusinessProcessSchema = new mongoose.Schema({
    businessProcess: {
        title: { type: String, required: true }, // Title of the business process
        subTitle: { type: String, required: true }, // Sub-title of the business process
    },
    section1: { type: SectionSchema, required: true }, // Section 1
    section2: { type: SectionSchema, required: true }, // Section 2
    section3: { type: SectionSchema, required: true }, // Section 3
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false // Removes the __v field
});

module.exports = mongoose.model('BusinessProcess', BusinessProcessSchema);
