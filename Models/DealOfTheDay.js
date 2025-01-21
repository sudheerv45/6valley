const mongoose = require("mongoose");

const dealOfTheDaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters."],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "At least one product is required."],
      },
    ], // Allow multiple products for the deal
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Removes the __v field
  }
);

module.exports = mongoose.model("DealOfTheDay", dealOfTheDaySchema);
