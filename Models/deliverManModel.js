const mongoose = require("mongoose");

const deliveryManSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
      match: [/^[A-Za-z\s]+$/, "First name must only contain alphabets."],
      maxlength: [50, "First name cannot exceed 50 characters."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      match: [/^[A-Za-z\s]+$/, "Last name must only contain alphabets."],
      maxlength: [50, "Last name cannot exceed 50 characters."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      unique: true,
      match: [
        /^\+?[1-9]\d{1,14}$/,
        "Please enter a valid phone number (e.g., +1234567890).",
      ],
    },
    idType: {
      type: String,
      required: [true, "ID type is required."],
      enum: ["Passport", "Driver's License", "National ID", "Other"], // Predefined list of ID types
    },
    idNumber: {
      type: String,
      required: [true, "ID number is required."],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Address is required."],
      trim: true,
      maxlength: [200, "Address cannot exceed 200 characters."],
    },
    image: {
      type: String, // URL or file path to the delivery man's image
      match: [
        /\.(jpg|jpeg|png|gif)$/,
        "Image must be in .jpg, .jpeg, .png, or .gif format.",
      ],
    },
    idImage: {
      type: String, // URL or file path to the ID proof image
      match: [
        /\.(jpg|jpeg|png|gif)$/,
        "ID image must be in .jpg, .jpeg, .png, or .gif format.",
      ],
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
      minlength: [8, "Password must be at least 8 characters long."], // Ensure stronger passwords
    },
    isDeleted: {
      type: Boolean,
      default: false, // Soft delete flag
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Removes the __v field
  }
);

const DeliveryMan = mongoose.model("DeliveryMan", deliveryManSchema);

module.exports = DeliveryMan;
