const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
            unique: true
        },
        priority: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },
        categoryLogo: {
            type: String, // Path or URL to the image
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model('Category', CategorySchema);
