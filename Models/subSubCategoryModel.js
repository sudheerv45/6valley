const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubSubCategorySchema = new Schema(
    {
        subSubCategoryName: {
            type: String,
            required: true,
            unique: true
        },
        mainCategory: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        subCategory: {
            type: Schema.Types.ObjectId,
            ref: 'SubCategory',
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

module.exports = mongoose.model('SubSubCategory', SubSubCategorySchema);
