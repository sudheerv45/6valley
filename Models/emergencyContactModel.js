const mongoose = require("mongoose");

const emergencyContactSchema = new mongoose.Schema(
  {
    contactName: {
      type: String,
      required: [true, "Contact name is required."],
      trim: true,
      maxlength: [50, "Contact name cannot exceed 50 characters."],
    },
    phone: {
      type: String, // Changed to String to handle formats like "+1-123-456-7890"
      required: [true, "Phone number is required."],
      unique: true,
      match: [
        /^\+?[1-9]\d{1,14}$/,
        "Please enter a valid phone number (e.g., +1234567890).",
      ],
    },
    status: {
      type: Boolean,
      default: true, // Default status is active
    },
    isDeleted: {
      type: Boolean,
      default: false, // Soft delete flag
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Removes the __v field
  }
);

module.exports = mongoose.model("EmergencyContact", emergencyContactSchema);
