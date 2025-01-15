const mongoose = require('mongoose');

const offlinePaymentMethodSchema = new mongoose.Schema(
  {
    paymentInformation: [
      {
        paymentMethodName: { type: String, required: true }, // e.g., "Bank Transfer"
        inputFieldName: { type: String, required: true },    // e.g., "Account Number"
        inputData: { type: String, required: true },         // e.g., "123456789"
      },
    ],
    requiredInformation: [
      {
        inputFieldName: { type: String, required: true },    // e.g., "Bank Name"
        placeholder: { type: String, required: true },       // e.g., "Enter your bank name"
        isRequired: { type: Boolean, default: false },       // e.g., true or false
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OfflinePaymentMethod', offlinePaymentMethodSchema);
