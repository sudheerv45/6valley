const BusinessProcess = require('../../../../Models/System Settings/Pages&Media/Vendor Registration/businessProcessModel');

// Create a new Business Process
const createBusinessProcess = async (req, res) => {
    try {
        const { businessProcess, section1, section2, section3 } = req.body;

        if (!businessProcess || !section1 || !section2 || !section3) {
            return res.status(400).json({ status: false, message: 'All sections and business process details are required' });
        }

        const newBusinessProcess = new BusinessProcess({
            businessProcess,
            section1,
            section2,
            section3,
        });

        await newBusinessProcess.save();

        res.status(201).json({ status: true, message: 'Business Process created successfully', data: newBusinessProcess });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error creating Business Process', error: error.message });
    }
};

// Retrieve all Business Processes
const getAllBusinessProcesses = async (req, res) => {
    try {
        const businessProcesses = await BusinessProcess.find({ deleted: false });
        res.status(200).json({ status: true, data: businessProcesses });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Retrieve a specific Business Process
const getBusinessProcess = async (req, res) => {
    try {
        const businessProcess = await BusinessProcess.findOne({ _id: req.params.id, deleted: false });
        if (!businessProcess) {
            return res.status(404).json({ status: false, message: 'Business Process not found' });
        }
        res.status(200).json({ status: true, data: businessProcess });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Update an existing Business Process
const updateBusinessProcess = async (req, res) => {
    try {
        const { businessProcess, section1, section2, section3 } = req.body;

        const updatedData = { businessProcess, section1, section2, section3 };

        const updatedBusinessProcess = await BusinessProcess.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            updatedData,
            { new: true }
        );

        if (!updatedBusinessProcess) {
            return res.status(404).json({ status: false, message: 'Business Process not found' });
        }

        res.status(200).json({ status: true, message: 'Business Process updated successfully', data: updatedBusinessProcess });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error updating Business Process', error: error.message });
    }
};

// Soft delete a Business Process
const deleteBusinessProcess = async (req, res) => {
    try {
        const businessProcess = await BusinessProcess.findById(req.params.id);
        if (!businessProcess) {
            return res.status(404).json({ status: false, message: 'Business Process not found' });
        }

        businessProcess.deleted = true;
        await businessProcess.save();

        res.status(200).json({ status: true, message: 'Business Process deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore a soft-deleted Business Process
const restoreBusinessProcess = async (req, res) => {
    try {
        const businessProcess = await BusinessProcess.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );

        if (!businessProcess) {
            return res.status(404).json({ status: false, message: 'Business Process not found' });
        }

        res.status(200).json({ status: true, message: 'Business Process restored successfully', data: businessProcess });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createBusinessProcess,
    getAllBusinessProcesses,
    getBusinessProcess,
    updateBusinessProcess,
    deleteBusinessProcess,
    restoreBusinessProcess,
};
