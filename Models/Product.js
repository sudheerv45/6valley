// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String },
    // category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    // subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },  //should take reference 
    // subSubCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubSubCategory" },
    category: { type:String},
    subCategory: { type:String},
    subSubCategory: { type:String},
    brand: { type: String },
    productType: { type: String },
    productSKU: { type: String, unique: true },
    unit: { type: String },
    unitPrice: { type: Number, required: true },
    minOrderQty: { type: Number },
    currentStockQty: { type: Number },
    discountType: { type: String, enum: ["Percentage", "Flat"] },
    discountAmount: { type: Number },
    taxAmount: { type: Number },
    taxCalculation: { type: String, enum: ["Inclusive", "Exclusive"] },
    shippingCost: { type: Number },
    productThumbnail: { type: String }, // URL of the thumbnail image
    additionalImages: [{ type: String }], // Array of URLs
    metaTitle: { type: String },
    metaImage: { type: String },
    metaDescription: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);