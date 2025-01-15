// models/EnvironmentInformation.js
const mongoose = require("mongoose");

const environmentInformationSchema = new mongoose.Schema({
  appName: {
    type: String,
    required: true,
  },
  appDebug: {
    type: Boolean,
    required: true,
  },
  appMode: {
    type: String,
    enum: ["live", "dev"],
    required: true,
  },
  appUrl: {
    type: String,
    required: true,
  },
  dbConnection: {
    type: String,
    required: true,
  },
  dbHost: {
    type: String,
    required: true,
  },
  dbPort: {
    type: Number,
    required: true,
  },
  dbUsername: {
    type: String,
    required: true,
  },
  dbPassword: {
    type: String,
    required: true,
  },
  buyerUsername: {
    type: String,
    required: true,
  },
  purchaseCode: {
    type: String,
    required: true,
  },
});

// Export the model
module.exports = mongoose.model("EnvironmentInformation", environmentInformationSchema);
