const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema(
    {
        subCategoryName: {
            type: String,
            required: [true, 'Sub-category name is required.'],
            unique: true,
            trim: true,
            minlength: [3, 'Sub-category name must be at least 3 characters long.'],
            maxlength: [50, 'Sub-category name must not exceed 50 characters.'],
            validate: {
                validator: function (value) {
                    return /^[A-Za-z\s]+$/.test(value);
                },
                message: 'Sub-category name should only contain alphabets and spaces.',
            },
        },
        mainCategory: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Main category reference is required.'],
        },
        priority: {
            type: Number,
            required: [true, 'Priority is required.'],
            min: [0, 'Priority must be greater than or equal to 0.'],
            max: [10, 'Priority must be less than or equal to 10.'],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model('SubCategory', SubCategorySchema);
