// controllers/socialMediaLogin.controller.js
const SocialMediaLogin = require('../../../../Models/System Settings/3rd Party/Other Configurations/socialMediaLoginModel');

const createOrUpdateSocialMediaLogin = async (req, res) => {
  try {
    const existingRecord = await SocialMediaLogin.findOne({ isDeleted: false });

    if (existingRecord) {
      // Update existing record
      const updatedRecord = await SocialMediaLogin.findByIdAndUpdate(
        existingRecord._id,
        req.body,
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedRecord);
    }

    // Create new record if none exists
    const newRecord = new SocialMediaLogin(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSocialMediaLogin = async (req, res) => {
  try {
    const record = await SocialMediaLogin.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const softDeleteSocialMediaLogin = async (req, res) => {
  try {
    const record = await SocialMediaLogin.findOneAndUpdate(
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

const restoreSocialMediaLogin = async (req, res) => {
  try {
    const record = await SocialMediaLogin.findOneAndUpdate(
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

module.exports = {
  createOrUpdateSocialMediaLogin,
  getSocialMediaLogin,
  softDeleteSocialMediaLogin,
  restoreSocialMediaLogin,
};