const mongoose = require('mongoose');

const recaptchaSchema = new mongoose.Schema(
  {
    status: {
      type: Boolean,
      default: false,
    },
    siteKey: {
      type: String,
      required: [true, 'Site key is required.'],
      match: [/^[A-Za-z0-9-_]{39,40}$/, 'Site key must be a valid ReCAPTCHA site key format.'],
    },
    secretKey: {
      type: String,
      required: [true, 'Secret key is required.'],
      match: [/^[A-Za-z0-9-_]{39,40}$/, 'Secret key must be a valid ReCAPTCHA secret key format.'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Recaptcha = mongoose.model('Recaptcha', recaptchaSchema);

module.exports = Recaptcha;
