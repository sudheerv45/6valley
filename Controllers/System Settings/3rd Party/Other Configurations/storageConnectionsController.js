// controllers/storageConnections.controller.js
const StorageConnections = require('../../../../Models/System Settings/3rd Party/Other Configurations/storageConnectionsModel');

const createOrUpdateStorageConnections = async (req, res) => {
  try {
    const existingRecord = await StorageConnections.findOne({ isDeleted: false });

    if (existingRecord) {
      // Update existing record
      const updatedRecord = await StorageConnections.findByIdAndUpdate(
        existingRecord._id,
        req.body,
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedRecord);
    }

    // Create new record if none exists
    const newRecord = new StorageConnections(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStorageConnections = async (req, res) => {
  try {
    const record = await StorageConnections.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const softDeleteStorageConnections = async (req, res) => {
  try {
    const record = await StorageConnections.findOneAndUpdate(
      { isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ message: 'Record soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const restoreStorageConnections = async (req, res) => {
  try {
    const record = await StorageConnections.findOneAndUpdate(
      { isDeleted: true },
      { isDeleted: false },
      { new: true }
    );
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ message: 'Record restored successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleLocalSystem = async (req, res) => {
  try {
    const record = await StorageConnections.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });

    record.storageConnectionSettings.localSystem = !record.storageConnectionSettings.localSystem;
    await record.save();

    res.status(200).json({ message: 'Local system toggled', record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleThirdPartyStorage = async (req, res) => {
  try {
    const record = await StorageConnections.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });

    record.storageConnectionSettings.thirdPartyStorage = !record.storageConnectionSettings.thirdPartyStorage;
    await record.save();

    res.status(200).json({ message: 'Third-party storage toggled', record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateStorageConnections,
  getStorageConnections,
  softDeleteStorageConnections,
  restoreStorageConnections,
  toggleLocalSystem,
  toggleThirdPartyStorage,
};
