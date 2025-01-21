const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema(
    {
        fileName: { 
            type: String, 
            required: [true, 'File name is required'], 
            trim: true, 
            maxlength: [255, 'File name cannot exceed 255 characters'] 
        }, // Name of the file
        uploadFile: { 
            type: String, 
            required: [true, 'File path or URL is required'], 
            trim: true, 
            validate: {
                validator: function (v) {
                    // Ensure uploadFile is a valid URL or file path
                    return /^(https?:\/\/|\/).+/i.test(v);
                },
                message: 'Please provide a valid file path or URL'
            }
        }, // Path or URL of the uploaded file
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

module.exports = mongoose.model('Gallery', GallerySchema);
