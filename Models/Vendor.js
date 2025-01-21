const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      match: [/^[A-Za-z\s]+$/, "First name must only contain alphabets and spaces."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      match: [/^[A-Za-z\s]+$/, "Last name must only contain alphabets and spaces."],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required."],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10,15}$/.test(v); // Allows numbers with 10-15 digits
        },
        message: "Phone number must be between 10 and 15 digits.",
      },
    },
    email: {
      type: String,
      required: [true, "Email address is required."],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be at least 8 characters long."],
    },
    shopName: {
      type: String,
      required: [true, "Shop name is required."],
    },
    shopAddress: {
      type: String,
      required: [true, "Shop address is required."],
    },
    vendorImage: {
      type: String, // URL for vendor image
      validate: {
        validator: function (v) {
          return !v || /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(v);
        },
        message: "Vendor image must be a valid URL pointing to an image.",
      },
    },
    shopLogo: {
      type: String, // URL for shop logo
      validate: {
        validator: function (v) {
          return !v || /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(v);
        },
        message: "Shop logo must be a valid URL pointing to an image.",
      },
    },
    shopBanner: {
      type: String, // URL for shop banner
      validate: {
        validator: function (v) {
          return !v || /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(v);
        },
        message: "Shop banner must be a valid URL pointing to an image.",
      },
    },
    deleted: {
      type: Boolean,
      default: false, // Soft delete flag
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes the __v field
  }
);

// Unique Indexes for Email and Phone
vendorSchema.index({ email: 1, phone: 1 }, { unique: true });

module.exports = mongoose.model("Vendor", vendorSchema);
