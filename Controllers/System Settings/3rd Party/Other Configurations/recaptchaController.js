// controllers/recaptcha.controller.js
const Recaptcha = require('../../../../Models/System Settings/3rd Party/Other Configurations/recaptchaModel');

const createOrUpdateRecaptcha = async (req, res) => {
  try {
    const existingRecord = await Recaptcha.findOne({ isDeleted: false });

    if (existingRecord) {
      // Update existing record
      const updatedRecord = await Recaptcha.findByIdAndUpdate(
        existingRecord._id,
        req.body,
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedRecord);
    }

    // Create new record if none exists
    const newRecord = new Recaptcha(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecaptcha = async (req, res) => {
  try {
    const record = await Recaptcha.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const softDeleteRecaptcha = async (req, res) => {
  try {
    const record = await Recaptcha.findOneAndUpdate(
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

const restoreRecaptcha = async (req, res) => {
  try {
    const record = await Recaptcha.findOneAndUpdate(
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

const toggleRecaptchaStatus = async (req, res) => {
  try {
    const record = await Recaptcha.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });

    record.status = !record.status;
    await record.save();

    res.status(200).json({ message: 'Recaptcha status toggled', record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateRecaptcha,
  getRecaptcha,
  softDeleteRecaptcha,
  restoreRecaptcha,
  toggleRecaptchaStatus,
};
