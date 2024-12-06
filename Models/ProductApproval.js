const mongoose = require('mongoose');

const productApprovalSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    requestType: { type: String, enum: ['New', 'Update'], required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Denied'], default: 'Pending' },
    comments: { type: String }, // Admin comments
    requestDetails: { type: Object }, // Holds updated details for "Update" requests
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ProductApproval', productApprovalSchema);