const mongoose = require('mongoose');

const googleMapApisSchema = new mongoose.Schema(
  {
    googleMapApiSetup: {
      type: Boolean,
      default: false,
    },
    mapApiKeyClient: {
      type: String,
      required: [true, 'Client API key is required.'],
      minlength: [30, 'Client API key must be at least 30 characters long.'],
      maxlength: [255, 'Client API key must not exceed 255 characters.'],
      match: [/^[A-Za-z0-9-_]+$/, 'Client API key must be alphanumeric and may include "-" or "_".'],
    },
    mapApiKeyServer: {
      type: String,
      required: [true, 'Server API key is required.'],
      minlength: [30, 'Server API key must be at least 30 characters long.'],
      maxlength: [255, 'Server API key must not exceed 255 characters.'],
      match: [/^[A-Za-z0-9-_]+$/, 'Server API key must be alphanumeric and may include "-" or "_".'],
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

const GoogleMapApis = mongoose.model('GoogleMapApis', googleMapApisSchema);

module.exports = GoogleMapApis;
