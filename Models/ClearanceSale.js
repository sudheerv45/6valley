const mongoose = require("mongoose");

const clearanceSaleSchema = new mongoose.Schema(
  {
    duration: {
      type: Number,
      required: true,
      min: 1, // Ensure the duration is positive
      validate: {
        validator: function (v) {
          return Number.isInteger(v); // Ensure it's a whole number
        },
        message: "Duration must be an integer",
      },
    },
    discountType: {
      type: String,
      enum: ["flat", "product-wise"],
      required: true,
    },
    discountAmount: {
      type: Number,
      required: function () {
        return this.discountType === "flat";
      },
      validate: {
        validator: function (v) {
          if (this.discountType === "flat" && v <= 0) {
            return false; // Flat discount must be greater than 0
          }
          return true;
        },
        message: "Discount amount must be greater than 0 for flat discount",
      },
    },
    offerActiveTime: {
      type: String,
      enum: ["always", "specific"],
      required: true,
    },
    startTime: {
      type: String,
      required: function () {
        return this.offerActiveTime === "specific";
      },
    },
    endTime: {
      type: String,
      required: function () {
        return this.offerActiveTime === "specific";
      },
      validate: {
        validator: function (v) {
          if (this.startTime && new Date(this.startTime) > new Date(v)) {
            return false; // End time must be after start time
          }
          return true;
        },
        message: "End time must be after start time",
      },
    },
    products: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

module.exports = mongoose.model("ClearanceSale", clearanceSaleSchema);
