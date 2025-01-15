const DeliveryManSettings = require('../../../../Models/System Settings/Buiness Setup/Business Settings/deliveryManSettingsModel');

// Create or Update Delivery Man Settings
const createOrUpdateDeliveryManSettings = async (req, res) => {
    try {
        const { uploadPictureOnDelivery, forgotPasswordVerificationBy } = req.body;

        let settings = await DeliveryManSettings.findOne({ deleted: false });

        if (settings) {
            // Update existing record
            settings.uploadPictureOnDelivery = uploadPictureOnDelivery;
            settings.forgotPasswordVerificationBy = forgotPasswordVerificationBy;
            await settings.save();
            return res.status(200).json({ status: true, message: 'Delivery man settings updated successfully', data: settings });
        } else {
            // Create new record
            settings = new DeliveryManSettings({ uploadPictureOnDelivery, forgotPasswordVerificationBy });
            await settings.save();
            return res.status(201).json({ status: true, message: 'Delivery man settings created successfully', data: settings });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error processing request', error: error.message });
    }
};

// Get Delivery Man Settings
const getDeliveryManSettings = async (req, res) => {
    try {
        const settings = await DeliveryManSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Delivery man settings not found' });
        }
        res.status(200).json({ status: true, data: settings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Soft Delete Delivery Man Settings
const deleteDeliveryManSettings = async (req, res) => {
    try {
        const settings = await DeliveryManSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Delivery man settings not found' });
        }

        settings.deleted = true;
        await settings.save();
        res.status(200).json({ status: true, message: 'Delivery man settings deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore Soft-Deleted Delivery Man Settings
const restoreDeliveryManSettings = async (req, res) => {
    try {
        const settings = await DeliveryManSettings.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );

        if (!settings) {
            return res.status(404).json({ status: false, message: 'Delivery man settings not found' });
        }

        res.status(200).json({ status: true, message: 'Delivery man settings restored successfully', data: settings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Toggle uploadPictureOnDelivery
const toggleUploadPictureOnDelivery = async (req, res) => {
    try {
        const settings = await DeliveryManSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Delivery man settings not found' });
        }

        settings.uploadPictureOnDelivery = !settings.uploadPictureOnDelivery;
        await settings.save();

        res.status(200).json({ 
            status: true, 
            message: 'uploadPictureOnDelivery toggled successfully', 
            data: settings 
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error toggling uploadPictureOnDelivery', error: error.message });
    }
};


module.exports = {
    createOrUpdateDeliveryManSettings,
    getDeliveryManSettings,
    deleteDeliveryManSettings,
    restoreDeliveryManSettings,
    toggleUploadPictureOnDelivery
};
