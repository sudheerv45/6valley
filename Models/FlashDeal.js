const mongoose = require("mongoose");

const flashDealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Flash deal title is required."],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters."],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required."],
      validate: {
        validator: function (value) {
          return value > Date.now();
        },
        message: "Start date must be in the future.",
      },
    },
    endDate: {
      type: Date,
      required: [true, "End date is required."],
      validate: {
        validator: function (value) {
          return this.startDate ? value > this.startDate : false;
        },
        message: "End date must be later than the start date.",
      },
    },
    image: {
      type: String,
      required: [true, "Image URL is required."],
      match: [/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/, "Please provide a valid image URL."],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "At least one product is required for a flash deal."],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Removes the `__v` field
  }
);

module.exports = mongoose.model("FlashDeal", flashDealSchema);
