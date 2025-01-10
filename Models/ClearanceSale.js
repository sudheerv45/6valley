const mongoose = require("mongoose");

const clearanceSaleSchema = new mongoose.Schema({
    duration: { type: String, required: true }, // e.g., "2 weeks" or specific dates
    discountType: { type: String, enum: ["flat", "product-wise"], required: true },
    discountAmount: { type: Number, required: function () { return this.discountType === "flat"; } }, // Percentage for flat discount
    offerActiveTime: {
        type: String,
        enum: ["always", "specific"],
        required: true,
    },
    startTime: {
        type: String,
        required: function () { return this.offerActiveTime === "specific"; }, // Specific time start
    },
    endTime: {
        type: String,
        required: function () { return this.offerActiveTime === "specific"; }, // Specific time end
    },
    products: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ClearanceSale", clearanceSaleSchema);
