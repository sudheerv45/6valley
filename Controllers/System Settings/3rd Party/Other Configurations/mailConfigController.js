// controllers/mailConfig.controller.js
const MailConfig = require('../../../../Models/System Settings/3rd Party/Other Configurations/mailConfigModel');

const createOrUpdateMailConfig = async (req, res) => {
  try {
    const existingRecord = await MailConfig.findOne({ isDeleted: false });

    if (existingRecord) {
      // Update existing record
      const updatedRecord = await MailConfig.findByIdAndUpdate(
        existingRecord._id,
        req.body,
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedRecord);
    }

    // Create new record if none exists
    const newRecord = new MailConfig(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMailConfig = async (req, res) => {
  try {
    const record = await MailConfig.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const softDeleteMailConfig = async (req, res) => {
  try {
    const record = await MailConfig.findOneAndUpdate(
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

const restoreMailConfig = async (req, res) => {
  try {
    const record = await MailConfig.findOneAndUpdate(
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

const toggleSmtpStatus = async (req, res) => {
  try {
    const record = await MailConfig.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });

    record.smtpMailConfig.status = !record.smtpMailConfig.status;
    await record.save();
    res.status(200).json({ message: 'SMTP status toggled successfully', status: record.smtpMailConfig.status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleSendgridStatus = async (req, res) => {
  try {
    const record = await MailConfig.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });

    record.sendgridMailConfig.status = !record.sendgridMailConfig.status;
    await record.save();
    res.status(200).json({ message: 'Sendgrid status toggled successfully', status: record.sendgridMailConfig.status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateMailConfig,
  getMailConfig,
  softDeleteMailConfig,
  restoreMailConfig,
  toggleSmtpStatus,
  toggleSendgridStatus,
};