const mongoose = require('mongoose');

const OtpLoginAttemptsSchema = new mongoose.Schema({
    maxOtpHit: { 
        type: Number, 
        required: [true, 'Maximum OTP hit limit is required'], 
        min: [1, 'Maximum OTP hit limit must be at least 1'], 
        validate: {
            validator: Number.isInteger,
            message: 'Maximum OTP hit limit must be an integer',
        },
    },
    otpResendTime: { 
        type: Number, 
        required: [true, 'OTP resend time is required'], 
        min: [1, 'OTP resend time must be at least 1 minute'], 
        validate: {
            validator: Number.isInteger,
            message: 'OTP resend time must be an integer',
        },
    },
    temporaryBlockTime: { 
        type: Number, 
        required: [true, 'Temporary block time is required'], 
        min: [1, 'Temporary block time must be at least 1 minute'], 
        validate: {
            validator: Number.isInteger,
            message: 'Temporary block time must be an integer',
        },
    },
    maxLoginHit: { 
        type: Number, 
        required: [true, 'Maximum login hit limit is required'], 
        min: [1, 'Maximum login hit limit must be at least 1'], 
        validate: {
            validator: Number.isInteger,
            message: 'Maximum login hit limit must be an integer',
        },
    },
    tempLoginBlockTime: { 
        type: Number, 
        required: [true, 'Temporary login block time is required'], 
        min: [1, 'Temporary login block time must be at least 1 minute'], 
        validate: {
            validator: Number.isInteger,
            message: 'Temporary login block time must be an integer',
        },
    },
    deleted: { 
        type: Boolean, 
        default: false, // Default value for soft delete flag
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes the __v field
});

module.exports = mongoose.model('OtpLoginAttempts', OtpLoginAttemptsSchema);
