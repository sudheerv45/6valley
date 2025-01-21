const mongoose = require('mongoose');

// Define the Customer schema
const CustomerSchema = new mongoose.Schema(
  {
    firstName: { 
      type: String, 
      required: true, 
      trim: true,
      validate: {
        validator: function (value) {
          return /^[A-Za-z]+$/.test(value); // Only alphabets
        },
        message: 'First name should contain only alphabets.'
      }
    },
    lastName: { 
      type: String, 
      required: true, 
      trim: true,
      validate: {
        validator: function (value) {
          return /^[A-Za-z]+$/.test(value); // Only alphabets
        },
        message: 'Last name should contain only alphabets.'
      }
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Email format
        },
        message: 'Invalid email format.'
      }
    },
    phone: { 
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return value ? /^[0-9]{10,15}$/.test(value) : true; // Optional, only digits, 10-15 characters
        },
        message: 'Phone number must contain only digits and be 10 to 15 characters long.'
      }
    },
    country: { 
      type: String, 
      trim: true,
      validate: {
        validator: function (value) {
          return value ? /^[A-Za-z\s]+$/.test(value) : true; // Optional, only alphabets and spaces
        },
        message: 'Country name should contain only alphabets and spaces.'
      }
    },
    city: { 
      type: String, 
      trim: true,
      validate: {
        validator: function (value) {
          return value ? /^[A-Za-z\s]+$/.test(value) : true; // Optional, only alphabets and spaces
        },
        message: 'City name should contain only alphabets and spaces.'
      }
    },
    zipcode: { 
      type: String, 
      trim: true,
      validate: {
        validator: function (value) {
          return value ? /^[0-9]{5,10}$/.test(value) : true; // Optional, 5-10 digit numeric
        },
        message: 'Zipcode must contain only digits and be between 5 to 10 characters long.'
      }
    },
    address: { 
      type: String, 
      trim: true,
      validate: {
        validator: function (value) {
          return value ? value.length <= 255 : true; // Optional, max length 255 characters
        },
        message: 'Address must be 255 characters or less.'
      }
    },
    isDeleted: { 
      type: Boolean, 
      default: false 
    }, // Soft delete field
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Export the model
module.exports = mongoose.model('Customer', CustomerSchema);
