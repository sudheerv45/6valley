// models/recaptcha.model.js
const mongoose = require('mongoose');

const recaptchaSchema = new mongoose.Schema(
  {
    status: {
      type: Boolean,
      default: false,
    },
    siteKey: {
      type: String,
      required: true,
    },
    secretKey: {
      type: String,
      required: true,
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