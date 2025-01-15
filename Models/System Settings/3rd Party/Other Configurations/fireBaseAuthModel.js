// models/firebaseAuth.model.js
const mongoose = require('mongoose');

const firebaseAuthSchema = new mongoose.Schema(
  {
    firebaseAuthVerificationStatus: {
      type: Boolean,
      default: false,
    },
    webApiKey: {
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

const FirebaseAuth = mongoose.model('FirebaseAuth', firebaseAuthSchema);

module.exports = FirebaseAuth;