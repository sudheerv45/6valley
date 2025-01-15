const CancellationPolicy = require('../../../../Models/System Settings/Pages&Media/Business Pages/cancellationPolicyModel');

const createCancellationPolicy = async (req, res) => {
    try {
        const cancellationPolicy = new CancellationPolicy(req.body);
        await cancellationPolicy.save();
        res.status(201).json({ status: true, message: 'Cancellation Policy created successfully', data: cancellationPolicy });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Cancellation Policy', error: error.message });
    }
};

const getCancellationPolicies = async (req, res) => {
    try {
        const cancellationPolicies = await CancellationPolicy.find({ deleted: false });
        res.status(200).json({ status: true, data: cancellationPolicies });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getCancellationPolicy = async (req, res) => {
    try {
        const cancellationPolicy = await CancellationPolicy.findOne({ _id: req.params.id, deleted: false });
        if (!cancellationPolicy) return res.status(404).json({ status: false, message: 'Cancellation Policy not found' });
        res.status(200).json({ status: true, data: cancellationPolicy });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateCancellationPolicy = async (req, res) => {
    try {
        const cancellationPolicy = await CancellationPolicy.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!cancellationPolicy) return res.status(404).json({ status: false, message: 'Cancellation Policy not found' });
        res.status(200).json({ status: true, message: 'Cancellation Policy updated successfully', data: cancellationPolicy });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating Cancellation Policy', error: error.message });
    }
};

const deleteCancellationPolicy = async (req, res) => {
    try {
        const cancellationPolicy = await CancellationPolicy.findById(req.params.id);
        if (!cancellationPolicy) return res.status(404).json({ status: false, message: 'Cancellation Policy not found' });

        cancellationPolicy.deleted = true;
        await cancellationPolicy.save();
        res.status(200).json({ status: true, message: 'Cancellation Policy deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createCancellationPolicy,
    getCancellationPolicies,
    getCancellationPolicy,
    updateCancellationPolicy,
    deleteCancellationPolicy
};
