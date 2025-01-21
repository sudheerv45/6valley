const mongoose = require('mongoose');

const SocialMediaLinksSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Social media platform name is required'], 
        maxlength: [255, 'Social media platform name cannot exceed 255 characters'], 
        trim: true, // Removes leading/trailing spaces
    },
    socialMediaLink: { 
        type: String, 
        required: [true, 'Social media link is required'], 
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/i.test(v);
            },
            message: 'Please enter a valid URL',
        },
    },
    status: { 
        type: Boolean, 
        default: true, 
    },
    deleted: { 
        type: Boolean, 
        default: false, 
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes the __v field
});

module.exports = mongoose.model('SocialMediaLinks', SocialMediaLinksSchema);
