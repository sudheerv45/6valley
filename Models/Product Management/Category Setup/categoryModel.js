const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: [true, 'Category name is required.'],
            unique: true,
            trim: true,
            minlength: [3, 'Category name must be at least 3 characters long.'],
            maxlength: [50, 'Category name must not exceed 50 characters.'],
            validate: {
                validator: function (value) {
                    return /^[A-Za-z\s]+$/.test(value);
                },
                message: 'Category name should only contain alphabets and spaces.',
            },
        },
        priority: {
            type: Number,
            required: [true, 'Priority is required.'],
            min: [0, 'Priority must be greater than or equal to 0.'],
            max: [10, 'Priority must be less than or equal to 10.'],
        },
        categoryLogo: {
            type: String,
            required: [true, 'Category logo is required.'],
            trim: true,
            validate: {
                validator: function (value) {
                    return /\.(png|jpg|jpeg|svg|gif)$/.test(value);
                },
                message: 'Category logo must point to a valid image file (png, jpg, jpeg, svg, gif).',
            },
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model('Category', CategorySchema);
