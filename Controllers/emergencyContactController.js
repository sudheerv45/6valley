const EmergencyContact = require('../Models/emergencyContactModel');

// Create a new emergency contact
const createEmergencyContact = async (req, res) => {
  try {
    const emergencyContact = new EmergencyContact(req.body);
    await emergencyContact.save();
    res.status(201).json({ success: true, data: emergencyContact });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all emergency contacts (excluding soft-deleted)
const getEmergencyContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ isDeleted: false });
    res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single emergency contact by ID
const getEmergencyContactById = async (req, res) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);
    if (!contact || contact.isDeleted) {
      return res.status(404).json({ success: false, error: 'Emergency contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update an emergency contact by ID
const updateEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact || contact.isDeleted) {
      return res.status(404).json({ success: false, error: 'Emergency contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Soft delete an emergency contact by ID
const softDeleteEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Emergency contact not found' });
    }
    res.status(200).json({ success: true, message: 'Emergency contact soft deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Restore a soft-deleted emergency contact by ID
const restoreEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true });
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Emergency contact not found' });
    }
    res.status(200).json({ success: true, message: 'Emergency contact restored' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Toggle the status of an emergency contact
const toggleEmergencyContactStatus = async (req, res) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);
    if (!contact || contact.isDeleted) {
      return res.status(404).json({ success: false, error: 'Emergency contact not found' });
    }
    contact.status = !contact.status;
    await contact.save();
    res.status(200).json({
      success: true,
      message: `Emergency contact status changed to ${contact.status ? 'active' : 'inactive'}`,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = {
    createEmergencyContact,
    getEmergencyContactById,
    getEmergencyContacts,
    updateEmergencyContact,
    softDeleteEmergencyContact,
    restoreEmergencyContact,
    toggleEmergencyContactStatus
}