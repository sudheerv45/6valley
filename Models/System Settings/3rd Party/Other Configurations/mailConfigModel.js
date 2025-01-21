const mongoose = require('mongoose');

const mailConfigSchema = new mongoose.Schema(
  {
    smtpMailConfig: {
      mailerName: {
        type: String,
        required: [true, 'Mailer name is required.'],
        trim: true, // Trim whitespaces from the beginning and end
        minlength: [3, 'Mailer name must be at least 3 characters long.'],
        maxlength: [50, 'Mailer name must not exceed 50 characters.'],
      },
      host: {
        type: String,
        required: [true, 'SMTP host is required.'],
        trim: true,
      },
      driver: {
        type: String,
        required: [true, 'Driver type is required.'],
        enum: ['smtp', 'sendgrid'], // Can add more options if necessary
        lowercase: true,
      },
      port: {
        type: Number,
        required: [true, 'Port is required.'],
        min: [1, 'Port must be a positive number.'],
        max: [65535, 'Port must be a valid port number.'],
      },
      username: {
        type: String,
        required: [true, 'Username is required.'],
        trim: true,
      },
      emailId: {
        type: String,
        required: [true, 'Email ID is required.'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address.'],
      },
      encryption: {
        type: String,
        required: [true, 'Encryption method is required.'],
        enum: ['ssl', 'tls', 'none'], // Example encryption methods
        lowercase: true,
      },
      password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [8, 'Password must be at least 8 characters long.'],
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
    sendgridMailConfig: {
      mailerName: {
        type: String,
        required: [true, 'Mailer name is required.'],
        trim: true,
        minlength: [3, 'Mailer name must be at least 3 characters long.'],
        maxlength: [50, 'Mailer name must not exceed 50 characters.'],
      },
      host: {
        type: String,
        required: [true, 'SendGrid host is required.'],
        trim: true,
      },
      driver: {
        type: String,
        required: [true, 'Driver type is required.'],
        enum: ['sendgrid'], // Only sendgrid for sendgrid config
        lowercase: true,
      },
      port: {
        type: Number,
        required: [true, 'Port is required.'],
        min: [1, 'Port must be a positive number.'],
        max: [65535, 'Port must be a valid port number.'],
      },
      username: {
        type: String,
        required: [true, 'Username is required.'],
        trim: true,
      },
      emailId: {
        type: String,
        required: [true, 'Email ID is required.'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address.'],
      },
      encryption: {
        type: String,
        required: [true, 'Encryption method is required.'],
        enum: ['ssl', 'tls', 'none'], // Example encryption methods
        lowercase: true,
      },
      password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [8, 'Password must be at least 8 characters long.'],
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const MailConfig = mongoose.model('MailConfig', mailConfigSchema);

module.exports = MailConfig;
