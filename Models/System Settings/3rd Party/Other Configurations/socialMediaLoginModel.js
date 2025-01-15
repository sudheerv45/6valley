// models/socialMediaLogin.model.js
const mongoose = require('mongoose');

const socialMediaLoginSchema = new mongoose.Schema(
  {
    googleLogin: {
      callbackUrl: {
        type: String,
        required: true,
      },
      clientId: {
        type: String,
        required: true,
      },
      clientSecretKey: {
        type: String,
        required: true,
      },
    },
    facebookLogin: {
      callbackUrl: {
        type: String,
        required: true,
      },
      clientId: {
        type: String,
        required: true,
      },
      clientSecretKey: {
        type: String,
        required: true,
      },
    },
    appleLogin: {
      clientId: {
        type: String,
        required: true,
      },
      teamId: {
        type: String,
        required: true,
      },
      keyId: {
        type: String,
        required: true,
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

const SocialMediaLogin = mongoose.model('SocialMediaLogin', socialMediaLoginSchema);

module.exports = SocialMediaLogin;