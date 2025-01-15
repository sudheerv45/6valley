const ShippingMethod = require('../../../../Models/System Settings/Buiness Setup/Business Settings/shippingMethodsModel');

// Add or Update Shipping Method
const addOrUpdateShippingMethod = async (req, res) => {
    try {
        const existingRecord = await ShippingMethod.findOne({ deleted: false });
        if (existingRecord) {
            Object.assign(existingRecord, req.body);
            await existingRecord.save();
            return res.status(200).json({
                status: true,
                message: 'Shipping method updated successfully',
                data: existingRecord,
            });
        } else {
            const newRecord = new ShippingMethod(req.body);
            await newRecord.save();
            return res.status(201).json({
                status: true,
                message: 'Shipping method created successfully',
                data: newRecord,
            });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get Shipping Method
const getShippingMethod = async (req, res) => {
    try {
        const record = await ShippingMethod.findOne({ deleted: false });
        if (!record) {
            return res.status(404).json({ status: false, message: 'Shipping method not found' });
        }
        res.status(200).json({ status: true, data: record });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Delete Shipping Method (Soft Delete)
const deleteShippingMethod = async (req, res) => {
    try {
        const record = await ShippingMethod.findOne({ deleted: false });
        if (!record) {
            return res.status(404).json({ status: false, message: 'Shipping method not found' });
        }
        record.deleted = true;
        await record.save();
        res.status(200).json({ status: true, message: 'Shipping method deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Restore Shipping Method
const restoreShippingMethod = async (req, res) => {
    try {
        const record = await ShippingMethod.findOne({ deleted: true });
        if (!record) {
            return res.status(404).json({ status: false, message: 'No deleted shipping method found' });
        }
        record.deleted = false;
        await record.save();
        res.status(200).json({ status: true, message: 'Shipping method restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Status of a Shipping Detail
const toggleShippingDetailStatus = async (req, res) => {
    try {
        const { index } = req.params; // Index of the shipping detail
        const record = await ShippingMethod.findOne({ deleted: false });
        if (!record) {
            return res.status(404).json({ status: false, message: 'Shipping method not found' });
        }
        if (record.shippingDetails[index]) {
            record.shippingDetails[index].status = !record.shippingDetails[index].status;
            await record.save();
            res.status(200).json({
                status: true,
                message: 'Shipping detail status toggled successfully',
                data: record.shippingDetails[index],
            });
        } else {
            res.status(404).json({ status: false, message: 'Shipping detail not found' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    addOrUpdateShippingMethod,
    getShippingMethod,
    deleteShippingMethod,
    restoreShippingMethod,
    toggleShippingDetailStatus,
};
