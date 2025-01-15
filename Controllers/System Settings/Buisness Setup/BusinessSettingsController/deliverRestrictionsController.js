const DeliveryRestrictions = require('../../../../Models/System Settings/Buiness Setup/Business Settings/delveryRestrictionsModel');

// Add or Update Delivery Restrictions
const addOrUpdateDeliveryRestrictions = async (req, res) => {
    try {
        const existingRecord = await DeliveryRestrictions.findOne({ deleted: false });
        if (existingRecord) {
            Object.assign(existingRecord, req.body);
            await existingRecord.save();
            return res.status(200).json({
                status: true,
                message: 'Delivery restrictions updated successfully',
                data: existingRecord,
            });
        } else {
            const newRecord = new DeliveryRestrictions(req.body);
            await newRecord.save();
            return res.status(201).json({
                status: true,
                message: 'Delivery restrictions created successfully',
                data: newRecord,
            });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get Delivery Restrictions
const getDeliveryRestrictions = async (req, res) => {
    try {
        const record = await DeliveryRestrictions.findOne({ deleted: false });
        if (!record) {
            return res.status(404).json({ status: false, message: 'Delivery restrictions not found' });
        }
        res.status(200).json({ status: true, data: record });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Delete Delivery Restrictions (Soft Delete)
const deleteDeliveryRestrictions = async (req, res) => {
    try {
        const record = await DeliveryRestrictions.findOne({ deleted: false });
        if (!record) {
            return res.status(404).json({ status: false, message: 'Delivery restrictions not found' });
        }
        record.deleted = true;
        await record.save();
        res.status(200).json({ status: true, message: 'Delivery restrictions deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Restore Delivery Restrictions
const restoreDeliveryRestrictions = async (req, res) => {
    try {
        const record = await DeliveryRestrictions.findOne({ deleted: true });
        if (!record) {
            return res.status(404).json({ status: false, message: 'No deleted delivery restrictions found' });
        }
        record.deleted = false;
        await record.save();
        res.status(200).json({ status: true, message: 'Delivery restrictions restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Delivery Available by Country
const toggleDeliveryAvailableCountry = async (req, res) => {
    try {
        const record = await DeliveryRestrictions.findOne({ deleted: false });
        if (!record) {
            return res.status(404).json({ status: false, message: 'Delivery restrictions not found' });
        }
        record.deliveryAvailableCountry = !record.deliveryAvailableCountry;
        await record.save();
        res.status(200).json({
            status: true,
            message: 'Delivery available by country toggled successfully',
            data: { deliveryAvailableCountry: record.deliveryAvailableCountry },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Delivery Available by Zip Code Area
const toggleDeliveryAvailableZipCodeArea = async (req, res) => {
    try {
        const record = await DeliveryRestrictions.findOne({ deleted: false });
        if (!record) {
            return res.status(404).json({ status: false, message: 'Delivery restrictions not found' });
        }
        record.deliveryAvailableZipCodeArea = !record.deliveryAvailableZipCodeArea;
        await record.save();
        res.status(200).json({
            status: true,
            message: 'Delivery available by zip code area toggled successfully',
            data: { deliveryAvailableZipCodeArea: record.deliveryAvailableZipCodeArea },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    addOrUpdateDeliveryRestrictions,
    getDeliveryRestrictions,
    deleteDeliveryRestrictions,
    restoreDeliveryRestrictions,
    toggleDeliveryAvailableCountry,
    toggleDeliveryAvailableZipCodeArea,
};
