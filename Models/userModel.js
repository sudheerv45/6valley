const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
      match: [/^[A-Za-z\s]+$/, "Full name must only contain alphabets and spaces."],
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^[0-9]{10,15}$/.test(v); // Allows 10-15 digit phone numbers
        },
        message: "Phone number must be between 10 and 15 digits.",
      },
    },
    image: {
      type: String, // URL or file path for profile picture
      validate: {
        validator: function (v) {
          return !v || /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(v);
        },
        message: "Image must be a valid URL pointing to an image file.",
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
    idType: {
      type: String,
      enum: ["Aadhaar", "PAN", "Voter ID", "Passport", "Driving License"], // Example ID types
      required: false,
    },
    idNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^[A-Za-z0-9-]{5,20}$/.test(v); // Example validation for alphanumeric ID numbers
        },
        message: "ID number must be alphanumeric and 5-20 characters long.",
      },
    },
    idImage: {
      type: String, // URL or file path for ID proof image
      validate: {
        validator: function (v) {
          return !v || /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(v);
        },
        message: "ID image must be a valid URL pointing to an image file.",
      },
    },
    status: {
      type: Boolean,
      default: true, // Active status by default
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role", // Reference to Role schema
      required: false,
    },
    deleted: {
      type: Boolean,
      default: false, // Soft delete flag
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    versionKey: false, // Removes the __v field
  }
);

module.exports = mongoose.model("User", userSchema);
