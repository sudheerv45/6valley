const mongoose = require('mongoose');

// Schema for Delivery Man Settings
const DeliveryManSettingsSchema = new mongoose.Schema(
  {
    uploadPictureOnDelivery: {
      type: Boolean,
      required: [true, 'The "uploadPictureOnDelivery" field is required.'],
    },
    forgotPasswordVerificationBy: {
      type: String,
      enum: {
        values: ['Email', 'Phone (OTP)'],
        message:
          'The "forgotPasswordVerificationBy" field must be either "Email" or "Phone (OTP)".',
      },
      required: [true, 'The "forgotPasswordVerificationBy" field is required.'],
    },
    deleted: { type: Boolean, default: false }, // Soft delete flag
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes the __v field
  }
);

// Middleware to exclude soft-deleted records from default queries
DeliveryManSettingsSchema.pre('find', function () {
  this.where({ deleted: false });
});

DeliveryManSettingsSchema.pre('findOne', function () {
  this.where({ deleted: false });
});

DeliveryManSettingsSchema.pre('findById', function () {
  this.where({ deleted: false });
});

module.exports = mongoose.model(
  'DeliveryManSettings',
  DeliveryManSettingsSchema
);
