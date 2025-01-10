const mongoose = require("mongoose");

const dealOfTheDaySchema = new mongoose.Schema({
    title: { type: String, required: true },
    products: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DealOfTheDay", dealOfTheDaySchema);
