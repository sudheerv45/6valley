const mongoose = require('mongoose');

const SortingSchema = new mongoose.Schema({
    useDefaultSortingList: { type: Boolean, default: false },
    useCustomSortingList: { type: Boolean, default: false },
}, { _id: false }); // Embedded schema

const PrioritySetupSchema = new mongoose.Schema({
    brand: SortingSchema,
    category: SortingSchema,
    vendorList: SortingSchema,
    featuredProducts: SortingSchema,
    newArrivalProducts: SortingSchema,
    topVendor: SortingSchema,
    categoryWiseProductList: SortingSchema,
    topRatedProducts: SortingSchema,
    bestSellingProducts: SortingSchema,
    productsListSearchBar: SortingSchema,
    vendorProductList: SortingSchema,
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
});

module.exports = mongoose.model('PrioritySetup', PrioritySetupSchema);
