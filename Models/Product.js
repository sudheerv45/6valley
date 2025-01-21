const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        match: [/^[A-Za-z\s]+$/, "Product Name must only contain alphabets and spaces"],
        minlength: [3, "Product Name must be at least 3 characters long"],
        maxlength: [100, "Product Name must not exceed 100 characters"],
    },
    description: { 
        type: String, 
        maxlength: [500, "Description cannot exceed 500 characters"], 
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required: true 
    },
    subCategory: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "SubCategory", 
        required: true 
    },
    subSubCategory: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "SubSubCategory" 
    },
    brand: { 
        type: String, 
        maxlength: [50, "Brand name cannot exceed 50 characters"], 
    },
    productType: { 
        type: String, 
        enum: ["Physical", "Digital", "Service"], 
    },
    productSKU: { 
        type: String, 
        unique: true, 
        required: true, 
        match: [/^[A-Za-z0-9-]+$/, "Product SKU should only contain alphanumeric characters and hyphens"], 
    },
    unit: { 
        type: String, 
        required: true 
    },
    unitPrice: { 
        type: Number, 
        required: true, 
        min: [0, "Unit Price must be a positive number"], 
    },
    minOrderQty: { 
        type: Number, 
        min: [1, "Minimum order quantity must be at least 1"], 
    },
    currentStockQty: { 
        type: Number, 
        min: [0, "Current stock quantity must be at least 0"], 
    },
    discountType: { 
        type: String, 
        enum: ["Percentage", "Flat"] 
    },
    discountAmount: { 
        type: Number, 
        min: [0, "Discount Amount must be a positive number"], 
        validate: {
            validator: function (v) {
                if (this.discountType === "Percentage" && (v < 0 || v > 100)) {
                    return false;
                }
                return true;
            },
            message: "Discount Amount must be between 0 and 100 if type is Percentage",
        },
    },
    taxAmount: { 
        type: Number, 
        min: [0, "Tax Amount must be a positive number"], 
    },
    taxCalculation: { 
        type: String, 
        enum: ["Inclusive", "Exclusive"] 
    },
    shippingCost: { 
        type: Number, 
        min: [0, "Shipping Cost must be a positive number"], 
    },
    productThumbnail: { 
        type: String, 
        match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, "Invalid URL for thumbnail image"], 
    },
    additionalImages: [{ 
        type: String, 
        match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, "Invalid URL for additional images"], 
    }],
    metaTitle: { 
        type: String, 
        maxlength: [100, "Meta Title cannot exceed 100 characters"], 
    },
    metaImage: { 
        type: String, 
        match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, "Invalid URL for meta image"], 
    },
    metaDescription: { 
        type: String, 
        maxlength: [300, "Meta Description cannot exceed 300 characters"], 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model("Product", productSchema);
