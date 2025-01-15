const mongoose = require('mongoose');

const AppDownloadInfoSchema = new mongoose.Schema({
    downloadLink: { type: String, required: true }, // Download link
    status: { type: Boolean, default: true }, // Active or Inactive status
}, { _id: false });

const GeneralSchema = new mongoose.Schema({
    companyInformation: {
        companyName: { type: String, required: true },
        phone: { type: String, required: true },
        country: { type: String, required: true },
        email: { type: String, required: true },
        timeZone: { type: String, required: true },
        language: { type: String, required: true },
        companyAddress: { type: String, required: true },
        latitude: { type: Number },
        longitude: { type: Number },
    },
    businessInformation: {
        currency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency', required: true },
        currencyPosition: { type: String, enum: ['left', 'right'], required: true },
        businessModel: { type: String, enum: ['single vendor', 'multi vendor'], required: true },
        pagination: { type: Number, required: true },
        companyCopyrightText: { type: String, required: true },
        digitsAfterDecimalPoint: { type: Number, required: true },
    },
    appDownloadInfo: {
        appleStore: { type: AppDownloadInfoSchema, required: true },
        googlePlayStore: { type: AppDownloadInfoSchema, required: true },
    },
    websiteColor: {
        primaryColor: { type: String, required: true },
        secondaryColor: { type: String, required: true },
    },
    websiteHeaderLogo: { type: String, required: true }, // File path
    websiteFooterLogo: { type: String, required: true }, // File path
    websiteFavicon: { type: String, required: true }, // File path
    loadingGif: { type: String, required: true }, // File path
    appLogo: { type: String, required: true }, // File path
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
});

module.exports = mongoose.model('General', GeneralSchema);
