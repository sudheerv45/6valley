const mongoose = require("mongoose");

const flashDealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    image: { type: String, required: true }, // URL or path of the uploaded image
    products: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FlashDeal", flashDealSchema);