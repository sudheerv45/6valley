// File: controllers/SoftwareUpdateController.js

const SoftwareUpdate = require('../../../../Models/System Settings/System Setup/System Settings/softwareUpdateModel');
const multer = require('multer');

// Configure Multer for file storage
const upload = multer({ dest: 'uploads/software-updates/' });

const createOrUpdateSoftwareUpdate =  async (req, res) => {
    try {
        const { codecanyonUsername, purchaseCode } = req.body;

        // Validation
        if (!codecanyonUsername || !purchaseCode || !req.file) {
            return res.status(400).json({ status: false, message: 'All fields are required.' });
        }

        const filePath = req.file.path; // Save the file path

        // Find or create/update the record
        const update = await SoftwareUpdate.findOneAndUpdate(
            { purchaseCode }, // Filter by purchaseCode
            { codecanyonUsername, updatedFile: filePath },
            { new: true, upsert: true }
        );

        res.status(200).json({ status: true, message: 'Software update added/updated successfully.', data: update });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getSoftwareUpdates = async (req, res) => {
    try {
        const softwareUpdates = await SoftwareUpdate.find();
        res.status(200).json({ status: true, data: softwareUpdates });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getSoftwareUpdate = async (req, res) => {
    try {
        const update = await SoftwareUpdate.findOne({ _id: req.params.id });
        if (!update) return res.status(404).json({ status: false, message: 'Software update not found.' });
        res.status(200).json({ status: true, data: update });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateSoftwareUpdate = async (req, res) => {
    try {
        const update = await SoftwareUpdate.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!update) return res.status(404).json({ status: false, message: 'Software update not found.' });
        res.status(200).json({ status: true, message: 'Software update updated successfully.', data: update });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const deleteSoftwareUpdate = async (req, res) => {
    try {
        const update = await SoftwareUpdate.findById(req.params.id);
        if (!update) return res.status(404).json({ status: false, message: 'Software update not found.' });

        update.deleted = true;
        await update.save();
        res.status(200).json({ status: true, message: 'Software update deleted successfully.' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createOrUpdateSoftwareUpdate,
    getSoftwareUpdates,
    getSoftwareUpdate,
    updateSoftwareUpdate,
    deleteSoftwareUpdate
};
