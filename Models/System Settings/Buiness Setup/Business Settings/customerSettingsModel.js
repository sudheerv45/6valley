const mongoose = require('mongoose');

const CustomerSettingsSchema = new mongoose.Schema(
  {
    customerWallet: { 
      type: Boolean, 
      default: false 
    }, // Enable or disable customer wallet
    customerLoyaltyPoints: { 
      type: Boolean, 
      default: false 
    }, // Enable or disable loyalty points
    customerReferralEarnings: { 
      type: Boolean, 
      default: false 
    }, // Enable or disable referral earnings
    addRefundAmountToWallet: { 
      type: Boolean, 
      default: false 
    }, // Enable or disable adding refund to wallet
    addFundToWallet: { 
      type: Boolean, 
      default: false 
    }, // Enable or disable adding funds to wallet
    minimumAddFundAmount: { 
      type: Number, 
      default: 0, 
      min: [0, "Minimum add fund amount cannot be negative"] 
    }, // Minimum fund addition amount
    maximumAddFundAmount: { 
      type: Number, 
      default: 0, 
      min: [0, "Maximum add fund amount cannot be negative"] 
    }, // Maximum fund addition amount
    equivalentPointTo1UnitCurrency: { 
      type: Number, 
      default: 0, 
      min: [0, "Equivalent points cannot be negative"] 
    }, // Points equivalent to 1 unit of currency
    loyaltyPointEarnOnEachOther: { 
      type: Number, 
      default: 0, 
      min: [0, "Loyalty points earned cannot be negative"] 
    }, // Points earned on each order
    minimumPointRequiredToConvert: { 
      type: Number, 
      default: 0, 
      min: [0, "Minimum points required cannot be negative"] 
    }, // Minimum points required to convert
    earningsToEachReferral: { 
      type: Number, 
      default: 0, 
      min: [0, "Earnings per referral cannot be negative"] 
    }, // Earnings per referral
    deleted: { 
      type: Boolean, 
      default: false 
    }, // Soft delete flag
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false, // Remove __v field
  }
);

// Middleware to validate logical relationships
CustomerSettingsSchema.pre('save', function (next) {
  if (this.addFundToWallet && this.minimumAddFundAmount > this.maximumAddFundAmount) {
    return next(new Error("Minimum add fund amount cannot exceed the maximum add fund amount"));
  }
  if (this.customerLoyaltyPoints && this.equivalentPointTo1UnitCurrency <= 0) {
    return next(new Error("Equivalent points to 1 unit currency must be greater than 0 when loyalty points are enabled"));
  }
  next();
});

// Exclude soft-deleted records from default queries
CustomerSettingsSchema.pre('find', function () {
  this.where({ deleted: false });
});

CustomerSettingsSchema.pre('findOne', function () {
  this.where({ deleted: false });
});

module.exports = mongoose.model('CustomerSettings', CustomerSettingsSchema);
