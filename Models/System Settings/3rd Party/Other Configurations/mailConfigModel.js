// models/mailConfig.model.js
const mongoose = require('mongoose');

const mailConfigSchema = new mongoose.Schema(
  {
    smtpMailConfig: {
      mailerName: { type: String, required: true },
      host: { type: String, required: true },
      driver: { type: String, required: true },
      port: { type: Number, required: true },
      username: { type: String, required: true },
      emailId: { type: String, required: true },
      encryption: { type: String, required: true },
      password: { type: String, required: true },
      status: { type: Boolean, default: false },
    },
    sendgridMailConfig: {
      mailerName: { type: String, required: true },
      host: { type: String, required: true },
      driver: { type: String, required: true },
      port: { type: Number, required: true },
      username: { type: String, required: true },
      emailId: { type: String, required: true },
      encryption: { type: String, required: true },
      password: { type: String, required: true },
      status: { type: Boolean, default: false },
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const MailConfig = mongoose.model('MailConfig', mailConfigSchema);

module.exports = MailConfig;