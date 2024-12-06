const AttributeSetup = require('../Models/attributeSetupModel');

// Create a new attribute
const createAttribute = async (req, res) => {
  try {
    const attribute = new AttributeSetup(req.body);
    await attribute.save();
    res.status(201).json({ success: true, data: attribute });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all attributes (excluding soft-deleted)
const getAttributes = async (req, res) => {
  try {
    const attributes = await AttributeSetup.find({ isDeleted: false });
    res.status(200).json({ success: true, data: attributes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single attribute by ID
const getAttributeById = async (req, res) => {
  try {
    const attribute = await AttributeSetup.findById(req.params.id);
    if (!attribute || attribute.isDeleted) {
      return res.status(404).json({ success: false, error: 'Attribute not found' });
    }
    res.status(200).json({ success: true, data: attribute });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update an attribute by ID
const updateAttribute = async (req, res) => {
  try {
    const attribute = await AttributeSetup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attribute || attribute.isDeleted) {
      return res.status(404).json({ success: false, error: 'Attribute not found' });
    }
    res.status(200).json({ success: true, data: attribute });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Soft delete an attribute by ID
const softDeleteAttribute = async (req, res) => {
  try {
    const attribute = await AttributeSetup.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!attribute) {
      return res.status(404).json({ success: false, error: 'Attribute not found' });
    }
    res.status(200).json({ success: true, message: 'Attribute soft deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Restore a soft-deleted attribute by ID
const restoreAttribute = async (req, res) => {
  try {
    const attribute = await AttributeSetup.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true });
    if (!attribute) {
      return res.status(404).json({ success: false, error: 'Attribute not found' });
    }
    res.status(200).json({ success: true, message: 'Attribute restored' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Permanently delete an attribute by ID
const permanentDeleteAttribute = async (req, res) => {
  try {
    const attribute = await AttributeSetup.findByIdAndDelete(req.params.id);
    if (!attribute) {
      return res.status(404).json({ success: false, error: 'Attribute not found' });
    }
    res.status(200).json({ success: true, message: 'Attribute permanently deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = {
    createAttribute,
    getAttributeById,
    getAttributes,
    softDeleteAttribute,
    restoreAttribute,
    permanentDeleteAttribute,
    updateAttribute
}