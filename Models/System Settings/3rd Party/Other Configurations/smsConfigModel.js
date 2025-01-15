// models/smsConfig.model.js
const mongoose = require('mongoose');

const smsConfigSchema = new mongoose.Schema(
  {
    twoFactor: {
      status: { type: Boolean, default: false },
      apiKey: { type: String, required: true },
    },
    msg91: {
      status: { type: Boolean, default: false },
      templateId: { type: String, required: true },
      authKey: { type: String, required: true },
    },
    alphanetSms: {
      status: { type: Boolean, default: false },
      apiKey: { type: String, required: true },
      otpTemplate: { type: String, required: true },
    },
    releans: {
      status: { type: Boolean, default: false },
      apiKey: { type: String, required: true },
      from: { type: String, required: true },
      otpTemplate: { type: String, required: true },
    },
    twilio: {
      status: { type: Boolean, default: false },
      sid: { type: String, required: true },
      messagingServiceId: { type: String, required: true },
      token: { type: String, required: true },
      from: { type: String, required: true },
      otpTemplate: { type: String, required: true },
    },
    nexmo: {
      status: { type: Boolean, default: false },
      apiKey: { type: String, required: true },
      apiSecret: { type: String, required: true },
      token: { type: String, required: true },
      from: { type: String, required: true },
      otpTemplate: { type: String, required: true },
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const SmsConfig = mongoose.model('SmsConfig', smsConfigSchema);

module.exports = SmsConfig;