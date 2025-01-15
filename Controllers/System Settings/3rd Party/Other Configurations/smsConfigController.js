// controllers/smsConfig.controller.js
const SmsConfig = require('../../../../Models/System Settings/3rd Party/Other Configurations/smsConfigModel');

const createOrUpdateSmsConfig = async (req, res) => {
  try {
    const existingRecord = await SmsConfig.findOne({ isDeleted: false });

    if (existingRecord) {
      // Update existing record
      const updatedRecord = await SmsConfig.findByIdAndUpdate(
        existingRecord._id,
        req.body,
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedRecord);
    }

    // Create new record if none exists
    const newRecord = new SmsConfig(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSmsConfig = async (req, res) => {
  try {
    const record = await SmsConfig.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const softDeleteSmsConfig = async (req, res) => {
  try {
    const record = await SmsConfig.findOneAndUpdate(
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

const restoreSmsConfig = async (req, res) => {
  try {
    const record = await SmsConfig.findOneAndUpdate(
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

const toggleStatus = async (req, res) => {
  try {
    const { section } = req.params;
    const record = await SmsConfig.findOne({ isDeleted: false });

    if (!record) return res.status(404).json({ message: 'Record not found' });

    if (record[section]) {
      record[section].status = !record[section].status;
      await record.save();
      return res.status(200).json({
        message: `${section} status toggled successfully`,
        status: record[section].status,
      });
    }

    res.status(400).json({ message: 'Invalid section' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateSmsConfig,
  getSmsConfig,
  softDeleteSmsConfig,
  restoreSmsConfig,
  toggleStatus,
};