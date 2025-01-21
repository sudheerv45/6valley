const mongoose = require('mongoose');

const socialMediaLoginSchema = new mongoose.Schema(
  {
    googleLogin: {
      callbackUrl: {
        type: String,
        required: [true, 'Google login callback URL is required'],
        match: [/(https?:\/\/[^\s]+)/, 'Please provide a valid URL for Google login callback']
      },
      clientId: {
        type: String,
        required: [true, 'Google client ID is required'],
        minlength: [20, 'Google client ID should be at least 20 characters long']
      },
      clientSecretKey: {
        type: String,
        required: [true, 'Google client secret key is required'],
        minlength: [40, 'Google client secret key should be at least 40 characters long']
      },
    },
    facebookLogin: {
      callbackUrl: {
        type: String,
        required: [true, 'Facebook login callback URL is required'],
        match: [/(https?:\/\/[^\s]+)/, 'Please provide a valid URL for Facebook login callback']
      },
      clientId: {
        type: String,
        required: [true, 'Facebook client ID is required'],
        minlength: [20, 'Facebook client ID should be at least 20 characters long']
      },
      clientSecretKey: {
        type: String,
        required: [true, 'Facebook client secret key is required'],
        minlength: [40, 'Facebook client secret key should be at least 40 characters long']
      },
    },
    appleLogin: {
      clientId: {
        type: String,
        required: [true, 'Apple client ID is required'],
        minlength: [20, 'Apple client ID should be at least 20 characters long']
      },
      teamId: {
        type: String,
        required: [true, 'Apple team ID is required'],
      },
      keyId: {
        type: String,
        required: [true, 'Apple key ID is required'],
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true, // Indicates whether the integration is active
    },
  },
  {
    timestamps: true,
  }
);

const SocialMediaLogin = mongoose.model('SocialMediaLogin', socialMediaLoginSchema);

module.exports = SocialMediaLogin;
