// models/googleMapApis.model.js
const mongoose = require('mongoose');

const googleMapApisSchema = new mongoose.Schema(
  {
    googleMapApiSetup: {
      type: Boolean,
      default: false,
    },
    mapApiKeyClient: {
      type: String,
      required: true,
    },
    mapApiKeyServer: {
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

const GoogleMapApis = mongoose.model('GoogleMapApis', googleMapApisSchema);

module.exports = GoogleMapApis;