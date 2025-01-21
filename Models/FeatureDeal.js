const mongoose = require("mongoose");

const featureDealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Feature deal title is required."],
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
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "At least one product is required for a feature deal."],
      },
    ],
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

module.exports = mongoose.model("FeatureDeal", featureDealSchema);
