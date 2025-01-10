const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    couponType: { type: String, enum: ["Discount on Purchase", "Free Delivery", "First Order"], required: true },
    couponTitle: { type: String, required: true },
    couponCode: { type: String, unique: true, required: true },
    couponBearer: { type: String, enum: ["Vendor", "Admin"], required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }, // Optional for Vendor
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // Optional for Customer
    limitForSameUser: { type: Number, default: 1 },
    discountType: { type: String, enum: ["Amount", "Percentage"], required: true },
    discountAmount: { type: Number, required: true },
    minPurchase: { type: Number, required: true },
    maxDiscount: { type: Number }, // Applicable for Percentage
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "inactive"], default: "active" }, 
});

module.exports = mongoose.model("Coupon", couponSchema);
