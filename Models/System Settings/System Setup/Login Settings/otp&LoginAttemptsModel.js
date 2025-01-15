const mongoose = require('mongoose');

const OtpLoginAttemptsSchema = new mongoose.Schema({
    maxOtpHit: { type: Number, required: true },             // Maximum OTP hit limit
    otpResendTime: { type: Number, required: true },          // OTP resend time in minutes
    temporaryBlockTime: { type: Number, required: true },     // Temporary block time after exceeding OTP hits
    maxLoginHit: { type: Number, required: true },             // Maximum login hit limit
    tempLoginBlockTime: { type: Number, required: true },      // Temporary block time after exceeding login hits
    deleted: { type: Boolean, default: false },                // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Remove __v field
});

module.exports = mongoose.model('OtpLoginAttempts', OtpLoginAttemptsSchema);
