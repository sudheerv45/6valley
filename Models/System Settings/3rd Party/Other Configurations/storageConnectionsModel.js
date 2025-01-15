// models/storageConnections.model.js
const mongoose = require('mongoose');

const storageConnectionsSchema = new mongoose.Schema(
  {
    storageConnectionSettings: {
      localSystem: {
        type: Boolean,
        default: false,
      },
      thirdPartyStorage: {
        type: Boolean,
        default: false,
      },
    },
    s3Credential: {
      accessKey: {
        type: String,
        required: true,
      },
      secretAccessKey: {
        type: String,
        required: true,
      },
      region: {
        type: String,
        required: true,
      },
      bucket: {
        type: String,
        required: true,
      },
      url: {
        type: String,
      },
      endpoint: {
        type: String,
      },
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

const StorageConnections = mongoose.model('StorageConnections', storageConnectionsSchema);

module.exports = StorageConnections;