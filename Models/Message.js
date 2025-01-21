const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderType: {
      type: String,
      enum: ["customer", "deliveryMan"], // Ensures only valid sender types
      required: [true, "Sender type is required."],
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderType", // Dynamically references either 'Customer' or 'DeliveryMan'
      required: [true, "Sender ID is required."],
    },
    message: {
      type: String,
      required: [true, "Message content is required."],
      trim: true, // Removes extra spaces at the start and end
      minlength: [1, "Message content cannot be empty."],
      maxlength: [1000, "Message content cannot exceed 1000 characters."],
    },
    timestamp: {
      type: Date,
      default: Date.now, // Automatically sets the current timestamp
    },
    status: {
      type: String,
      enum: ["unread", "read"], // Message status options
      default: "unread", // Default status is 'unread'
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    versionKey: false, // Removes the `__v` field from the schema
  }
);

module.exports = mongoose.model("Message", messageSchema);
