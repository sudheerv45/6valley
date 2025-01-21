const mongoose = require('mongoose');

const DeliveryRestrictionsSchema = new mongoose.Schema(
  {
    deliveryAvailableCountry: { type: Boolean, default: false }, // Delivery available by country
    countries: { type: [String], default: [] }, // List of countries where delivery is available
    deliveryAvailableZipCodeArea: { type: Boolean, default: false }, // Delivery available by zip code area
    zipCodes: { type: [String], default: [] }, // List of zip codes where delivery is available
    deleted: { type: Boolean, default: false }, // Soft delete flag
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
  }
);

module.exports = mongoose.model('DeliveryRestrictions', DeliveryRestrictionsSchema);
