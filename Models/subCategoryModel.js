const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema(
    {
        subCategoryName: {
            type: String,
            required: true,
            unique: true
        },
        mainCategory: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        priority: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model('SubCategory', SubCategorySchema);
