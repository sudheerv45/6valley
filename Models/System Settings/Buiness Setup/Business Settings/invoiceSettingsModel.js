const mongoose = require('mongoose');

// Schema for Invoice Settings
const InvoiceSettingsSchema = new mongoose.Schema(
    {
        termsAndConditions: { 
            type: String, 
            required: [true, 'Terms and Conditions are required'], 
            minlength: [10, 'Terms and Conditions must be at least 10 characters long'], 
            maxlength: [2000, 'Terms and Conditions cannot exceed 2000 characters'] 
        }, // Terms and conditions with length validation
        businessIdentity: { 
            type: String, 
            required: [true, 'Business Identity is required'], 
            maxlength: [255, 'Business Identity cannot exceed 255 characters'], 
            match: [/^[a-zA-Z0-9- ]+$/, 'Business Identity can only contain alphanumeric characters, spaces, and hyphens'] 
        }, // Business identity with alphanumeric and length validation
        businessIdentityType: { 
            type: String, 
            enum: {
                values: ['Tax ID', 'BIN Number', 'MUSAK'], 
                message: 'Business Identity Type must be one of the following: Tax ID, BIN Number, MUSAK'
            }, 
            required: [true, 'Business Identity Type is required'] 
        }, // Type of business identity with enum validation
        invoiceLogo: { 
            type: String, 
            match: [/\.(jpeg|jpg|png|gif)$/, 'Invoice Logo must be a valid image file (jpeg, jpg, png, gif)'] 
        }, // Invoice logo with file type validation
        deleted: { 
            type: Boolean, 
            default: false 
        }, // Soft delete flag
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false, // Removes the __v field
    }
);

module.exports = mongoose.model('InvoiceSettings', InvoiceSettingsSchema);
