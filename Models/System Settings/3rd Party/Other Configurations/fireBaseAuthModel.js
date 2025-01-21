const mongoose = require('mongoose');

const firebaseAuthSchema = new mongoose.Schema(
  {
    firebaseAuthVerificationStatus: {
      type: Boolean,
      default: false,
    },
    webApiKey: {
      type: String,
      required: [true, 'Firebase Web API Key is required'],
      match: [/^[A-Za-z0-9_=-]{39}$/, 'Invalid Firebase Web API Key format'], // Example regex, adjust as necessary
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true, // Indicates whether the Firebase authentication is active
    },
  },
  {
    timestamps: true,
  }
);

const FirebaseAuth = mongoose.model('FirebaseAuth', firebaseAuthSchema);

module.exports = FirebaseAuth;
