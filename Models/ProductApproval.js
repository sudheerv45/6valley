const mongoose = require('mongoose');

const productApprovalSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    requestType: { type: String, enum: ['New', 'Update'], required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Denied'], default: 'Pending' },
    comments: { 
      type: String, 
      maxlength: [500, "Comments should not exceed 500 characters"] // Limiting comment length
    },
    requestDetails: { 
      type: Object, // You can define a more specific schema here if necessary
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('ProductApproval', productApprovalSchema);
