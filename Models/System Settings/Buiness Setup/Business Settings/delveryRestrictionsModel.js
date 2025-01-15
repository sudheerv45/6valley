const mongoose = require('mongoose');

const DeliveryRestrictionsSchema = new mongoose.Schema({
    deliveryAvailableCountry: { type: Boolean, default: false }, // Delivery available by country
    deliveryAvailableZipCodeArea: { type: Boolean, default: false }, // Delivery available by zip code area
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
});

module.exports = mongoose.model('DeliveryRestrictions', DeliveryRestrictionsSchema);
