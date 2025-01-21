const mongoose = require('mongoose');

// SubLoginType schema definition for sub-login types under a login verification type
const SubLoginTypeSchema = new mongoose.Schema({
    loginVerificationType: {
        type: String,
        required: [true, 'Login verification type is required'], // Required field with custom validation message
    },
    status: {
        type: Boolean,
        default: true, // Default value set to true
    },
}, {
    _id: false, // This will make this schema behave like an embedded document in an array
});

// Main CustomerLogin schema definition
const CustomerLoginSchema = new mongoose.Schema({
    loginTypes: {
        type: String,
        required: [true, 'Login type is required'], // Ensures login type is provided
        enum: ['email', 'phone', 'social'], // Assuming these as possible login types
        message: 'Login type must be one of the following: email, phone, or social', // Custom error message for invalid login types
    },
    subLoginType: {
        type: [SubLoginTypeSchema],
        default: [],
        validate: {
            validator: function(value) {
                return value && value.length > 0; // Ensures subLoginType is not empty if provided
            },
            message: 'At least one sub-login type must be provided if loginTypes is specified', // Custom error message
        },
    },
    deleted: {
        type: Boolean,
        default: false, // Soft delete flag
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
});

module.exports = mongoose.model('CustomerLogin', CustomerLoginSchema);
