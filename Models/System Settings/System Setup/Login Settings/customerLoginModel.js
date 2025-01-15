const mongoose = require('mongoose');

const SubLoginTypeSchema = new mongoose.Schema({
    loginVerificationType: { type: String, required: true }, // Type of login verification
    status: { type: Boolean, default: true }, // Active or Inactive status
}, {
    _id: false, // This will make this schema to behave like an embedded document in an array
});

const CustomerLoginSchema = new mongoose.Schema({
    loginTypes: { type: String, required: true }, // Login type (string)
    subLoginType: { type: [SubLoginTypeSchema], default: [] }, // Array of sub-login types
    deleted: { type: Boolean, default: false }, // Soft delete flag
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Remove __v field
});

module.exports = mongoose.model('CustomerLogin', CustomerLoginSchema);
