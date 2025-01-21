const mongoose = require('mongoose');

const offlinePaymentMethodSchema = new mongoose.Schema(
  {
    paymentInformation: [
      {
        paymentMethodName: {
          type: String,
          required: true,
          match: [/^[A-Za-z\s]+$/, 'Payment Method Name should only contain alphabets and spaces.'], // Validate payment method name
        },
        inputFieldName: {
          type: String,
          required: true,
          match: [/^[A-Za-z0-9\s]+$/, 'Input Field Name should only contain alphanumeric characters and spaces.'], // Validate input field name
        },
        inputData: {
          type: String,
          required: true,
          validate: {
            validator: function (v) {
              // Validate if input data is a number (e.g., for bank account numbers)
              return !isNaN(v) || typeof v === 'string'; // Adjust validation depending on your needs
            },
            message: 'Input Data must be a valid number or string.',
          },
        },
      },
    ],
    requiredInformation: [
      {
        inputFieldName: {
          type: String,
          required: true,
          match: [/^[A-Za-z0-9\s]+$/, 'Input Field Name should only contain alphanumeric characters and spaces.'], // Validate required field name
        },
        placeholder: {
          type: String,
          required: true,
          maxlength: [100, 'Placeholder should not exceed 100 characters.'], // Ensure the placeholder is not too long
        },
        isRequired: {
          type: Boolean,
          default: false,
        },
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
