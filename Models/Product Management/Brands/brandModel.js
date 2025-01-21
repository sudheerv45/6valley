const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: [true, 'Brand name is required.'],
      trim: true,
      validate: {
        validator: function (value) {
          return /^[A-Za-z0-9\s]+$/.test(value); // Only allows letters, numbers, and spaces
        },
        message: 'Brand name can only contain letters, numbers, and spaces.',
      },
    },
    imageAltText: {
      type: String,
      required: [true, 'Image alt text is required.'],
      trim: true,
      validate: {
        validator: function (value) {
          return /^[A-Za-z0-9\s\-_,.]+$/.test(value); // Allows letters, numbers, spaces, and common special characters
        },
        message:
          'Image alt text can only contain letters, numbers, spaces, and characters like "-", "_", "," and "."',
      },
    },
    image: {
      type: String,
      required: [true, 'Image path or URL is required.'],
      trim: true,
      validate: {
        validator: function (value) {
          return /^(http[s]?:\/\/.*\.(?:png|jpg|jpeg|svg|gif))|(\.(png|jpg|jpeg|svg|gif))$/.test(value);
        },
        message: 'Image must be a valid URL or file path to an image (png, jpg, jpeg, svg, gif).',
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Brand', BrandSchema);