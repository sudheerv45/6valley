// houseShop.model.js
const mongoose = require('mongoose');

const houseShopSchema = new mongoose.Schema(
  {
    temporaryClose: {
      type: Boolean,
      default: false,
    },
    shopDetails: {
      type: String,
      required: true,
    },
    shopSettings: {
      minimumOrderAmount: {
        type: Number,
        required: true,
      },
      freeDeliveryOverAmount: {
        type: Number,
        required: true,
      },
    },
    vacation: {
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
      note: {
        type: String,
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
    timestamps: true,
  }
);

const HouseShop = mongoose.model('HouseShop', houseShopSchema);

module.exports = HouseShop;