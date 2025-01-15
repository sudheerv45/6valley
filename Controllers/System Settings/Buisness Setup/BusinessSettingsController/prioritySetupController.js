const PrioritySetup = require('../../../../Models/System Settings/Buiness Setup/Business Settings/prioritySetupModel');

// Add or Update Priority Setup
const addOrUpdatePrioritySetup = async (req, res) => {
    try {
        const existingRecord = await PrioritySetup.findOne({ deleted: false });
        if (existingRecord) {
            Object.assign(existingRecord, req.body);
            await existingRecord.save();
            return res.status(200).json({
                status: true,
                message: 'Priority setup updated successfully',
                data: existingRecord,
            });
        } else {
            const newRecord = new PrioritySetup(req.body);
            await newRecord.save();
            return res.status(201).json({
                status: true,
                message: 'Priority setup created successfully',
                data: newRecord,
            });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get Priority Setup
const getPrioritySetup = async (req, res) => {
    try {
        const record = await PrioritySetup.findOne({ deleted: false });
        if (!record) {
            return res.status(404).json({ status: false, message: 'Priority setup not found' });
        }
        res.status(200).json({ status: true, data: record });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Soft Delete Priority Setup
const deletePrioritySetup = async (req, res) => {
    try {
        const record = await PrioritySetup.findOneAndUpdate({ deleted: false }, { deleted: true });
        if (!record) {
            return res.status(404).json({ status: false, message: 'Priority setup not found' });
        }
        res.status(200).json({ status: true, message: 'Priority setup deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Restore Priority Setup
const restorePrioritySetup = async (req, res) => {
    try {
        const record = await PrioritySetup.findOneAndUpdate({ deleted: true }, { deleted: false });
        if (!record) {
            return res.status(404).json({ status: false, message: 'No deleted priority setup found' });
        }
        res.status(200).json({ status: true, message: 'Priority setup restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle API for individual sorting options
const toggleSortingOption = async (req, res) => {
    const { section, option } = req.params; // `section` and `option` from request parameters
    try {
        const record = await PrioritySetup.findOne({ deleted: false });
        if (!record) {
            return res.status(404).json({ status: false, message: 'Priority setup not found' });
        }
        if (record[section] && record[section][option] !== undefined) {
            record[section][option] = !record[section][option];
            await record.save();
            return res.status(200).json({
                status: true,
                message: `${section} -> ${option} toggled successfully`,
                data: record,
            });
        } else {
            return res.status(400).json({ status: false, message: 'Invalid section or option' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    addOrUpdatePrioritySetup,
    getPrioritySetup,
    deletePrioritySetup,
    restorePrioritySetup,
    toggleSortingOption,
};
