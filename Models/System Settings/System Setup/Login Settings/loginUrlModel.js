const mongoose = require('mongoose');

// URL validation function
const urlValidator = (value) => {
    // Basic validation for absolute URLs
    const absoluteUrlPattern = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
    // Basic validation for relative URLs (assuming they start with "/")
    const relativeUrlPattern = /^\/[^\s]*$/;
    return absoluteUrlPattern.test(value) || relativeUrlPattern.test(value);
};

const LoginUrlSchema = new mongoose.Schema({
    pageType: { 
        type: String, 
        required: [true, 'Page type is required'], 
        enum: ['login', 'forgot password', 'reset password', 'signup'], // Add more page types if needed
        message: 'Page type must be one of the following: login, forgot password, reset password, signup', // Custom message
    },
    urlType: { 
        type: String, 
        required: [true, 'URL type is required'], 
        enum: ['relative', 'absolute'], // URL type validation (relative or absolute)
        message: 'URL type must be either "relative" or "absolute"', // Custom message
    },
    url: { 
        type: String, 
        required: [true, 'URL is required'], 
        validate: {
            validator: urlValidator, // Custom URL validator
            message: 'URL must be either an absolute or a relative URL', // Custom error message
        },
    },
    deleted: { 
        type: Boolean, 
        default: false, // Default soft delete flag
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes the __v field
});

module.exports = mongoose.model('LoginUrl', LoginUrlSchema);
