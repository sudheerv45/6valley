// controllers/googleMapApis.controller.js
const GoogleMapApis = require('../../../../Models/System Settings/3rd Party/Other Configurations/googleMapApisModel');

const createOrUpdateGoogleMapApis = async (req, res) => {
  try {
    const existingRecord = await GoogleMapApis.findOne({ isDeleted: false });

    if (existingRecord) {
      // Update existing record
      const updatedRecord = await GoogleMapApis.findByIdAndUpdate(
        existingRecord._id,
        req.body,
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedRecord);
    }

    // Create new record if none exists
    const newRecord = new GoogleMapApis(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGoogleMapApis = async (req, res) => {
  try {
    const record = await GoogleMapApis.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const softDeleteGoogleMapApis = async (req, res) => {
  try {
    const record = await GoogleMapApis.findOneAndUpdate(
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

const restoreGoogleMapApis = async (req, res) => {
  try {
    const record = await GoogleMapApis.findOneAndUpdate(
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

const toggleGoogleMapApiSetup = async (req, res) => {
  try {
    const record = await GoogleMapApis.findOne({ isDeleted: false });
    if (!record) return res.status(404).json({ message: 'Record not found' });

    record.googleMapApiSetup = !record.googleMapApiSetup;
    await record.save();

    res.status(200).json({ message: 'Google Map API Setup toggled', record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateGoogleMapApis,
  getGoogleMapApis,
  softDeleteGoogleMapApis,
  restoreGoogleMapApis,
  toggleGoogleMapApiSetup,
};