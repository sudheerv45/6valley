const General = require('../../../../Models/System Settings/Buiness Setup/Business Settings/generalModel');

// Add or Update General Settings
const addOrUpdateGeneral = async (req, res) => {
    try {
        const existingGeneral = await General.findOne({ deleted: false });
        if (existingGeneral) {
            Object.assign(existingGeneral, req.body);
            await existingGeneral.save();
            return res.status(200).json({
                status: true,
                message: 'General settings updated successfully',
                data: existingGeneral,
            });
        } else {
            const newGeneral = new General(req.body);
            await newGeneral.save();
            return res.status(201).json({
                status: true,
                message: 'General settings created successfully',
                data: newGeneral,
            });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get General Settings
const getGeneral = async (req, res) => {
    try {
        const general = await General.findOne({ deleted: false }).populate('businessInformation.currency');
        if (!general) {
            return res.status(404).json({ status: false, message: 'General settings not found' });
        }
        res.status(200).json({ status: true, data: general });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Delete General Settings (Soft Delete)
const deleteGeneral = async (req, res) => {
    try {
        const general = await General.findOne({ deleted: false });
        if (!general) {
            return res.status(404).json({ status: false, message: 'General settings not found' });
        }
        general.deleted = true;
        await general.save();
        res.status(200).json({ status: true, message: 'General settings deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Restore General Settings
const restoreGeneral = async (req, res) => {
    try {
        const general = await General.findOne({ deleted: true });
        if (!general) {
            return res.status(404).json({ status: false, message: 'No deleted general settings found' });
        }
        general.deleted = false;
        await general.save();
        res.status(200).json({ status: true, message: 'General settings restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Status for App Download Sections
const toggleAppleStoreStatus = async (req, res) => {
    try {
        const general = await General.findOne({ deleted: false });
        if (!general) {
            return res.status(404).json({ status: false, message: 'General settings not found' });
        }
        general.appDownloadInfo.appleStore.status = !general.appDownloadInfo.appleStore.status;
        await general.save();
        res.status(200).json({
            status: true,
            message: 'Apple Store status toggled successfully',
            data: { status: general.appDownloadInfo.appleStore.status },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

const toggleGooglePlayStoreStatus = async (req, res) => {
    try {
        const general = await General.findOne({ deleted: false });
        if (!general) {
            return res.status(404).json({ status: false, message: 'General settings not found' });
        }
        general.appDownloadInfo.googlePlayStore.status = !general.appDownloadInfo.googlePlayStore.status;
        await general.save();
        res.status(200).json({
            status: true,
            message: 'Google Play Store status toggled successfully',
            data: { status: general.appDownloadInfo.googlePlayStore.status },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    addOrUpdateGeneral,
    getGeneral,
    deleteGeneral,
    restoreGeneral,
    toggleAppleStoreStatus,
    toggleGooglePlayStoreStatus,
};
