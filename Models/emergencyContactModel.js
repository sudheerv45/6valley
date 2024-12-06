const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema(
  {
    contactName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true }, // Default status is active
    isDeleted: { type: Boolean, default: false }, // Soft delete flag
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
