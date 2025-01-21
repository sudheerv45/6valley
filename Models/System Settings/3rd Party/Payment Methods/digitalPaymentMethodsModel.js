const mongoose = require('mongoose');

const digitalPaymentMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      match: [/^[A-Za-z\s]+$/, 'Name should only contain alphabets and spaces.'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    type: {
      type: String,
      enum: ['live', 'test'],
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length >= 20; // Adjust length as per API requirements
        },
        message: 'Access token must have at least 20 characters.',
      },
    },
    publicKey: {
      type: String,
      required: true,
      match: [/^[A-Za-z0-9]+$/, 'Public key should only contain alphanumeric characters.'],
    },
    paymentGatewayTitle: {
      type: String,
      required: true,
    },
    chooseLogo: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Regular expression to check if the URL is valid
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: 'Invalid URL for the logo.',
      },
    },
    description: {
      type: String,
      default: '',
      maxlength: [500, 'Description cannot exceed 500 characters.'],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DigitalPaymentMethod', digitalPaymentMethodSchema);
