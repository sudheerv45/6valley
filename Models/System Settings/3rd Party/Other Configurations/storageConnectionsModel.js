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
        required: [true, 'AWS access key is required'],
        minlength: [20, 'AWS access key should be at least 20 characters long']
      },
      secretAccessKey: {
        type: String,
        required: [true, 'AWS secret access key is required'],
        minlength: [40, 'AWS secret access key should be at least 40 characters long']
      },
      region: {
        type: String,
        required: [true, 'AWS region is required'],
      },
      bucket: {
        type: String,
        required: [true, 'AWS S3 bucket name is required'],
      },
      url: {
        type: String,
        match: [/(https?:\/\/[^\s]+)/, 'Please provide a valid URL'],
      },
      endpoint: {
        type: String,
        match: [/(https?:\/\/[^\s]+)/, 'Please provide a valid endpoint URL'],
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true, // Indicates whether the storage connection is active
    },
  },
  {
    timestamps: true,
  }
);

const StorageConnections = mongoose.model('StorageConnections', storageConnectionsSchema);

module.exports = StorageConnections;
