// controllers/socialMediaChat.controller.js
const SocialMediaChat = require('../../../../Models/System Settings/3rd Party/Other Configurations/socialMediaChatModel');

const createOrUpdateSocialMediaChat = async (req, res) => {
  try {
    const existingRecord = await SocialMediaChat.findOne({ isDeleted: false });

    if (existingRecord) {
      // Update existing record
      const updatedRecord = await SocialMediaChat.findByIdAndUpdate(
        existingRecord._id,
        req.body,
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedRecord);
    }

    // Create new record if none exists
    const newRecord = new SocialMediaChat(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSocialMediaChat = async (req, res) => {
  try {
    const record = await SocialMediaChat.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const softDeleteSocialMediaChat = async (req, res) => {
  try {
    const record = await SocialMediaChat.findOneAndUpdate(
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

const restoreSocialMediaChat = async (req, res) => {
  try {
    const record = await SocialMediaChat.findOneAndUpdate(
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
    const record = await SocialMediaChat.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });

    record.status = !record.status;
    await record.save();

    res.status(200).json({ message: 'Status toggled', record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateSocialMediaChat,
  getSocialMediaChat,
  softDeleteSocialMediaChat,
  restoreSocialMediaChat,
  toggleStatus,
};