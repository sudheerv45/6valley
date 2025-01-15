const RefundPolicy = require('../../../../Models/System Settings/Pages&Media/Business Pages/refundPolicyModel');
const createRefundPolicy = async (req, res) => {
    try {
        const refundPolicy = new RefundPolicy(req.body);
        await refundPolicy.save();
        res.status(201).json({ status: true, message: 'Refund Policy created successfully', data: refundPolicy });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Refund Policy', error: error.message });
    }
};

const getRefundPolicies = async (req, res) => {
    try {
        const refundPolicies = await RefundPolicy.find({ deleted: false });
        res.status(200).json({ status: true, data: refundPolicies });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getRefundPolicy = async (req, res) => {
    try {
        const refundPolicy = await RefundPolicy.findOne({ _id: req.params.id, deleted: false });
        if (!refundPolicy) return res.status(404).json({ status: false, message: 'Refund Policy not found' });
        res.status(200).json({ status: true, data: refundPolicy });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateRefundPolicy = async (req, res) => {
    try {
        const refundPolicy = await RefundPolicy.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!refundPolicy) return res.status(404).json({ status: false, message: 'Refund Policy not found' });
        res.status(200).json({ status: true, message: 'Refund Policy updated successfully', data: refundPolicy });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating Refund Policy', error: error.message });
    }
};

const deleteRefundPolicy = async (req, res) => {
    try {
        const refundPolicy = await RefundPolicy.findById(req.params.id);
        if (!refundPolicy) return res.status(404).json({ status: false, message: 'Refund Policy not found' });

        refundPolicy.deleted = true;
        await refundPolicy.save();
        res.status(200).json({ status: true, message: 'Refund Policy deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createRefundPolicy,
    getRefundPolicies,
    getRefundPolicy,
    updateRefundPolicy,
    deleteRefundPolicy
};
