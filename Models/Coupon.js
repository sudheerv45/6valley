const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    couponType: {
      type: String,
      enum: ["Discount on Purchase", "Free Delivery", "First Order"],
      required: true,
    },
    couponTitle: { type: String, required: true },
    couponCode: {
      type: String,
      unique: true,
      required: true,
      match: [/^[A-Za-z0-9]+$/, "Coupon code must be alphanumeric"], // Alphanumeric code validation
    },
    couponBearer: {
      type: String,
      enum: ["Vendor", "Admin"],
      required: true,
    },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }, // Optional for Vendor
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // Optional for Customer
    limitForSameUser: { type: Number, default: 1 },
    discountType: {
      type: String,
      enum: ["Amount", "Percentage"],
      required: true,
    },
    discountAmount: { type: Number, required: true },
    minPurchase: { type: Number, required: true },
    maxDiscount: { type: Number }, // Applicable for Percentage
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false, // Remove version key (__v)
  }
);

// Pre-save hook to check expiry date
couponSchema.pre("save", function (next) {
  if (this.expiryDate < Date.now()) {
    this.status = "inactive"; // Automatically deactivate expired coupon
  }
  next();
});

// Discount validation based on type
couponSchema.pre("save", function (next) {
  if (this.discountType === "Percentage" && this.discountAmount > 100) {
    return next(new Error("Percentage discount cannot exceed 100%"));
  }
  if (
    this.discountType === "Amount" &&
    this.discountAmount <= 0
  ) {
    return next(new Error("Discount amount must be greater than 0"));
  }
  next();
});

module.exports = mongoose.model("Coupon", couponSchema);
