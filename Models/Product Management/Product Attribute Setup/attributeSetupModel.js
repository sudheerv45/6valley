const mongoose = require('mongoose');

const attributeSetupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Attribute name
    isDeleted: { type: Boolean, default: false }, // Soft delete flag
  },
  { timestamps: true }
);

module.exports = mongoose.model('AttributeSetup', attributeSetupSchema);
