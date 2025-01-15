const Reasons = require('../../../../Models/System Settings/Pages&Media/Vendor Registration/reasonsModel');

const createReason = async (req, res) => {
    try {
        const { title, shortDescription, priority } = req.body;

        if (!title || !shortDescription || priority === undefined) {
            return res.status(400).json({ status: false, message: 'Title, Short Description, and Priority are required' });
        }

        const reason = new Reasons({ title, shortDescription, priority });
        await reason.save();

        res.status(201).json({ status: true, message: 'Reason created successfully', data: reason });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error creating reason', error: error.message });
    }
};

const getReasons = async (req, res) => {
    try {
        const reasons = await Reasons.find({ deleted: false });
        res.status(200).json({ status: true, data: reasons });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getReason = async (req, res) => {
    try {
        const reason = await Reasons.findOne({ _id: req.params.id, deleted: false });
        if (!reason) {
            return res.status(404).json({ status: false, message: 'Reason not found' });
        }
        res.status(200).json({ status: true, data: reason });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateReason = async (req, res) => {
    try {
        const { title, shortDescription, priority, status } = req.body;

        const updateData = { title, shortDescription, priority, status };

        const reason = await Reasons.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            updateData,
            { new: true }
        );

        if (!reason) {
            return res.status(404).json({ status: false, message: 'Reason not found' });
        }

        res.status(200).json({ status: true, message: 'Reason updated successfully', data: reason });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error updating reason', error: error.message });
    }
};

const deleteReason = async (req, res) => {
    try {
        const reason = await Reasons.findById(req.params.id);
        if (!reason) {
            return res.status(404).json({ status: false, message: 'Reason not found' });
        }

        reason.deleted = true;
        await reason.save();

        res.status(200).json({ status: true, message: 'Reason deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreReason = async (req, res) => {
    try {
        const reason = await Reasons.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );

        if (!reason) {
            return res.status(404).json({ status: false, message: 'Reason not found' });
        }

        res.status(200).json({ status: true, message: 'Reason restored successfully', data: reason });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const toggleReasonStatus = async (req, res) => {
    try {
        const reason = await Reasons.findOne({ _id: req.params.id, deleted: false });
        if (!reason) {
            return res.status(404).json({ status: false, message: 'Reason not found' });
        }

        reason.status = !reason.status;
        await reason.save();

        res.status(200).json({ status: true, message: 'Reason status toggled successfully', data: reason });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createReason,
    getReasons,
    getReason,
    updateReason,
    deleteReason,
    restoreReason,
    toggleReasonStatus,
};
