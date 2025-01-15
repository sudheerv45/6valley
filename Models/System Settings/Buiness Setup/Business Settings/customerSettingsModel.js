const mongoose = require('mongoose');

const CustomerSettingsSchema = new mongoose.Schema(
    {
        customerWallet: { type: Boolean, default: false }, // Enable or disable customer wallet
        customerLoyaltyPoints: { type: Boolean, default: false }, // Enable or disable loyalty points
        customerReferralEarnings: { type: Boolean, default: false }, // Enable or disable referral earnings
        addRefundAmountToWallet: { type: Boolean, default: false }, // Enable or disable adding refund to wallet
        addFundToWallet: { type: Boolean, default: false }, // Enable or disable adding funds to wallet
        minimumAddFundAmount: { type: Number, default: 0 }, // Minimum fund addition amount
        maximumAddFundAmount: { type: Number, default: 0 }, // Maximum fund addition amount
        equivalentPointTo1UnitCurrency: { type: Number, default: 0 }, // Points equivalent to 1 unit of currency
        loyaltyPointEarnOnEachOther: { type: Number, default: 0 }, // Points earned on each other
        minimumPointRequiredToConvert: { type: Number, default: 0 }, // Minimum points required to convert
        earningsToEachReferral: { type: Number, default: 0 }, // Earnings per referral
        deleted: { type: Boolean, default: false }, // Soft delete flag
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
        versionKey: false, // Remove __v field
    }
);

module.exports = mongoose.model('CustomerSettings', CustomerSettingsSchema);
