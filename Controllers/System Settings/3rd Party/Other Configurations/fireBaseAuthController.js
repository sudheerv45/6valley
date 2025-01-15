// controllers/firebaseAuth.controller.js
const FirebaseAuth = require('../../../../Models/System Settings/3rd Party/Other Configurations/fireBaseAuthModel');

const createOrUpdateFirebaseAuth = async (req, res) => {
    try {
      const existingRecord = await FirebaseAuth.findOne({ isDeleted: false });
  
      if (existingRecord) {
        // Update existing record
        const updatedRecord = await FirebaseAuth.findByIdAndUpdate(
          existingRecord._id,
          req.body,
          { new: true, runValidators: true }
        );
        return res.status(200).json(updatedRecord);
      }
  
      // Create new record if none exists
      const newRecord = new FirebaseAuth(req.body);
      await newRecord.save();
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getFirebaseAuth = async (req, res) => {
    try {
      const record = await FirebaseAuth.findOne({ isDeleted: false });
      if (!record) return res.status(404).json({ message: 'Record not found' });
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const softDeleteFirebaseAuth = async (req, res) => {
    try {
      const record = await FirebaseAuth.findOneAndUpdate(
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
  
  const restoreFirebaseAuth = async (req, res) => {
    try {
      const record = await FirebaseAuth.findOneAndUpdate(
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
  
  const toggleFirebaseAuthVerificationStatus = async (req, res) => {
    try {
      const record = await FirebaseAuth.findOne({ isDeleted: false });
      if (!record) return res.status(404).json({ message: 'Record not found' });
  
      record.firebaseAuthVerificationStatus = !record.firebaseAuthVerificationStatus;
      await record.save();
  
      res.status(200).json({ message: 'Firebase Auth Verification Status toggled', record });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    createOrUpdateFirebaseAuth,
    getFirebaseAuth,
    softDeleteFirebaseAuth,
    restoreFirebaseAuth,
    toggleFirebaseAuthVerificationStatus,
  };