const mongoose = require('mongoose');

const attributeSetupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Attribute name is required.'],
      unique: true,
      trim: true, // Removes leading and trailing whitespace
      minlength: [3, 'Attribute name must be at least 3 characters long.'],
      maxlength: [100, 'Attribute name must not exceed 100 characters.'],
      validate: {
        validator: function(value) {
          return /^[A-Za-z0-9\s]+$/.test(value); // Only allows alphanumeric characters and spaces
        },
        message: 'Attribute name can only contain letters, numbers, and spaces.',
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model('AttributeSetup', attributeSetupSchema);
