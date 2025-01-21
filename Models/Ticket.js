const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      validate: {
        validator: async function(value) {
          const customerExists = await mongoose.model('Customer').findById(value);
          return customerExists ? true : false;
        },
        message: 'Customer not found!',
      },
    },
    issue: {
      type: String,
      required: true,
      minlength: [10, "Issue description must be at least 10 characters long"], // Ensuring a meaningful issue description
      maxlength: [500, "Issue description must not exceed 500 characters"], // Prevent overly long descriptions
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    response: {
      type: String,
      validate: {
        validator: function(value) {
          // Ensure that response exists only when the ticket is resolved or closed
          if ((this.status === "resolved" || this.status === "closed") && !value) {
            return false;
          }
          return true;
        },
        message: "A response is required when the ticket is resolved or closed",
      },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

// Optional: Middleware to update `updatedAt` when the ticket status changes
ticketSchema.pre("save", function(next) {
  if (this.isModified("status")) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model("Ticket", ticketSchema);
