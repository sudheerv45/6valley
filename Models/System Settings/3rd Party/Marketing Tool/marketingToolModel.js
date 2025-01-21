const mongoose = require('mongoose');

const marketingToolSchema = new mongoose.Schema(
  {
    platformName: {
      type: String,
      required: true, // e.g., "Google Ads"
      match: [/^[A-Za-z\s]+$/, "Platform Name must only contain alphabets"],
    },
    platformId: {
      type: String,
      required: true, // e.g., "12345-ABC"
      match: [/^[A-Za-z0-9\-]+$/, "Platform ID must be alphanumeric with optional hyphens"], // Example regex for alphanumeric IDs with hyphens
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '', // Optional field for describing the platform
    },
    startDate: {
      type: Date, 
      default: Date.now, // Optional start date for the marketing campaign
    },
    endDate: {
      type: Date, 
      default: null, // Optional end date for the marketing campaign
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MarketingTool', marketingToolSchema);
