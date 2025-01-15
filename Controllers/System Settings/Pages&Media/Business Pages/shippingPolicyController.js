const ShippingPolicy = require('../../../../Models/System Settings/Pages&Media/Business Pages/shippingPolicyModel');

const createShippingPolicy = async (req, res) => {
    try {
        const shippingPolicy = new ShippingPolicy(req.body);
        await shippingPolicy.save();
        res.status(201).json({ status: true, message: 'Shipping Policy created successfully', data: shippingPolicy });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Shipping Policy', error: error.message });
    }
};

const getShippingPolicies = async (req, res) => {
    try {
        const shippingPolicies = await ShippingPolicy.find({ deleted: false });
        res.status(200).json({ status: true, data: shippingPolicies });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getShippingPolicy = async (req, res) => {
    try {
        const shippingPolicy = await ShippingPolicy.findOne({ _id: req.params.id, deleted: false });
        if (!shippingPolicy) return res.status(404).json({ status: false, message: 'Shipping Policy not found' });
        res.status(200).json({ status: true, data: shippingPolicy });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateShippingPolicy = async (req, res) => {
    try {
        const shippingPolicy = await ShippingPolicy.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!shippingPolicy) return res.status(404).json({ status: false, message: 'Shipping Policy not found' });
        res.status(200).json({ status: true, message: 'Shipping Policy updated successfully', data: shippingPolicy });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating Shipping Policy', error: error.message });
    }
};

const deleteShippingPolicy = async (req, res) => {
    try {
        const shippingPolicy = await ShippingPolicy.findById(req.params.id);
        if (!shippingPolicy) return res.status(404).json({ status: false, message: 'Shipping Policy not found' });

        shippingPolicy.deleted = true;
        await shippingPolicy.save();
        res.status(200).json({ status: true, message: 'Shipping Policy deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createShippingPolicy,
    getShippingPolicies,
    getShippingPolicy,
    updateShippingPolicy,
    deleteShippingPolicy
};
