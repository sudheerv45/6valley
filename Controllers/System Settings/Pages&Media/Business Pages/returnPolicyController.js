const ReturnPolicy = require('../../../../Models/System Settings/Pages&Media/Business Pages/returnPolicyModel');
const createReturnPolicy = async (req, res) => {
    try {
        const returnPolicy = new ReturnPolicy(req.body);
        await returnPolicy.save();
        res.status(201).json({ status: true, message: 'Return Policy created successfully', data: returnPolicy });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Return Policy', error: error.message });
    }
};

const getReturnPolicies = async (req, res) => {
    try {
        const returnPolicies = await ReturnPolicy.find({ deleted: false });
        res.status(200).json({ status: true, data: returnPolicies });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getReturnPolicy = async (req, res) => {
    try {
        const returnPolicy = await ReturnPolicy.findOne({ _id: req.params.id, deleted: false });
        if (!returnPolicy) return res.status(404).json({ status: false, message: 'Return Policy not found' });
        res.status(200).json({ status: true, data: returnPolicy });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateReturnPolicy = async (req, res) => {
    try {
        const returnPolicy = await ReturnPolicy.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!returnPolicy) return res.status(404).json({ status: false, message: 'Return Policy not found' });
        res.status(200).json({ status: true, message: 'Return Policy updated successfully', data: returnPolicy });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating Return Policy', error: error.message });
    }
};

const deleteReturnPolicy = async (req, res) => {
    try {
        const returnPolicy = await ReturnPolicy.findById(req.params.id);
        if (!returnPolicy) return res.status(404).json({ status: false, message: 'Return Policy not found' });

        returnPolicy.deleted = true;
        await returnPolicy.save();
        res.status(200).json({ status: true, message: 'Return Policy deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createReturnPolicy,
    getReturnPolicies,
    getReturnPolicy,
    updateReturnPolicy,
    deleteReturnPolicy
};
