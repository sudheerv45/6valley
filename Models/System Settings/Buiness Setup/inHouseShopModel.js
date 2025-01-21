const mongoose = require('mongoose');

const houseShopSchema = new mongoose.Schema(
  {
    temporaryClose: {
      type: Boolean,
      default: false,
    },
    shopDetails: {
      type: String,
      required: [true, 'Shop details are required'],
      minlength: [3, 'Shop details must be at least 10 characters long'],
      maxlength: [500, 'Shop details cannot exceed 500 characters'],
    },
    shopSettings: {
      minimumOrderAmount: {
        type: Number,
        required: [true, 'Minimum order amount is required'],
        min: [0, 'Minimum order amount cannot be less than 0'],
      },
      freeDeliveryOverAmount: {
        type: Number,
        required: [true, 'Free delivery amount is required'],
        min: [0, 'Free delivery amount cannot be less than 0'],
      },
    },
    vacation: {
      start: {
        type: Date,
        validate: {
          validator: function (value) {
            // Ensure start date is before or equal to the end date
            if (this.vacation.end) {
              return value <= this.vacation.end;
            }
            return true;
          },
          message: 'Vacation start date must be before or equal to the end date',
        },
      },
      end: {
        type: Date,
        validate: {
          validator: function (value) {
            // Ensure end date is after or equal to the start date
            if (this.vacation.start) {
              return value >= this.vacation.start;
            }
            return true;
          },
          message: 'Vacation end date must be after or equal to the start date',
        },
      },
      note: {
        type: String,
        maxlength: [300, 'Vacation note cannot exceed 300 characters'],
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const HouseShop = mongoose.model('HouseShop', houseShopSchema);

module.exports = HouseShop;
