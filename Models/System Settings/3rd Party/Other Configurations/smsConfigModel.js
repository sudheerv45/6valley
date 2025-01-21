const mongoose = require('mongoose');

const smsConfigSchema = new mongoose.Schema(
  {
    twoFactor: {
      status: { type: Boolean, default: false },
      apiKey: {
        type: String,
        required: [true, 'API key for TwoFactor is required.'],
        match: [/^[A-Za-z0-9-_]{32,64}$/, 'API key must be a valid TwoFactor API key.']
      },
    },
    msg91: {
      status: { type: Boolean, default: false },
      templateId: {
        type: String,
        required: [true, 'Template ID for Msg91 is required.'],
        match: [/^[A-Za-z0-9]{6,15}$/, 'Template ID must be valid.']
      },
      authKey: {
        type: String,
        required: [true, 'Auth key for Msg91 is required.'],
        match: [/^[A-Za-z0-9]{16}$/, 'Auth key must be valid.']
      },
    },
    alphanetSms: {
      status: { type: Boolean, default: false },
      apiKey: {
        type: String,
        required: [true, 'API key for AlphanetSMS is required.'],
        match: [/^[A-Za-z0-9-_]{32,64}$/, 'API key must be valid for AlphanetSMS.']
      },
      otpTemplate: {
        type: String,
        required: [true, 'OTP Template ID for AlphanetSMS is required.'],
      },
    },
    releans: {
      status: { type: Boolean, default: false },
      apiKey: {
        type: String,
        required: [true, 'API key for Releans is required.'],
        match: [/^[A-Za-z0-9-_]{32,64}$/, 'API key must be valid for Releans.']
      },
      from: { type: String, required: [true, 'Sender ID (From) is required for Releans.'] },
      otpTemplate: { type: String, required: [true, 'OTP Template ID for Releans is required.'] },
    },
    twilio: {
      status: { type: Boolean, default: false },
      sid: {
        type: String,
        required: [true, 'Twilio SID is required.'],
        match: [/^AC[a-f0-9]{32}$/, 'Twilio SID must be valid.']
      },
      messagingServiceId: {
        type: String,
        required: [true, 'Twilio Messaging Service ID is required.']
      },
      token: {
        type: String,
        required: [true, 'Twilio Auth Token is required.'],
        match: [/^[a-f0-9]{32}$/, 'Twilio Auth Token must be valid.']
      },
      from: {
        type: String,
        required: [true, 'Twilio sender phone number (From) is required.']
      },
      otpTemplate: {
        type: String,
        required: [true, 'OTP Template ID for Twilio is required.']
      },
    },
    nexmo: {
      status: { type: Boolean, default: false },
      apiKey: {
        type: String,
        required: [true, 'API key for Nexmo is required.'],
        match: [/^[A-Za-z0-9]{32}$/, 'API key must be valid for Nexmo.']
      },
      apiSecret: {
        type: String,
        required: [true, 'API Secret for Nexmo is required.']
      },
      token: {
        type: String,
        required: [true, 'Nexmo token is required.'],
        match: [/^[A-Za-z0-9-_]{32,64}$/, 'Token must be valid for Nexmo.']
      },
      from: {
        type: String,
        required: [true, 'Sender ID (From) is required for Nexmo.']
      },
      otpTemplate: {
        type: String,
        required: [true, 'OTP Template ID for Nexmo is required.']
      },
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const SmsConfig = mongoose.model('SmsConfig', smsConfigSchema);

module.exports = SmsConfig;
