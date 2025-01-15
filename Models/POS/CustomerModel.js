const mongoose = require('mongoose');

// Define the Customer schema
const CustomerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    country: { type: String },
    city: { type: String },
    zipcode: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false }, // Soft delete field
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Export the model
module.exports = mongoose.model('Customer', CustomerSchema);
