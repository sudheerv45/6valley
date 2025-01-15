const DownloadApp = require('../../../../Models/System Settings/Pages&Media/Vendor Registration/downloadAppModel');

// Create or Update a Download App Section
const createOrUpdateDownloadApp = async (req, res) => {
    try {
        const { downloadAppSection, playStoreButton, appleStoreButton } = req.body;

        if (!downloadAppSection || !playStoreButton || !appleStoreButton) {
            return res.status(400).json({ status: false, message: 'All sections and buttons are required' });
        }

        let downloadApp = await DownloadApp.findOne({ deleted: false });

        if (downloadApp) {
            // Update existing record
            downloadApp.downloadAppSection = downloadAppSection;
            downloadApp.playStoreButton = playStoreButton;
            downloadApp.appleStoreButton = appleStoreButton;
            await downloadApp.save();
            return res.status(200).json({ status: true, message: 'Download App updated successfully', data: downloadApp });
        } else {
            // Create new record
            downloadApp = new DownloadApp({
                downloadAppSection,
                playStoreButton,
                appleStoreButton,
            });
            await downloadApp.save();
            return res.status(201).json({ status: true, message: 'Download App created successfully', data: downloadApp });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error processing request', error: error.message });
    }
};

// Get All Download App Sections
const getAllDownloadApps = async (req, res) => {
    try {
        const downloadApps = await DownloadApp.find({ deleted: false });
        res.status(200).json({ status: true, data: downloadApps });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Get a Specific Download App Section
const getDownloadApp = async (req, res) => {
    try {
        const downloadApp = await DownloadApp.findOne({ _id: req.params.id, deleted: false });
        if (!downloadApp) {
            return res.status(404).json({ status: false, message: 'Download App not found' });
        }
        res.status(200).json({ status: true, data: downloadApp });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Soft Delete a Download App Section
const deleteDownloadApp = async (req, res) => {
    try {
        const downloadApp = await DownloadApp.findById(req.params.id);
        if (!downloadApp) {
            return res.status(404).json({ status: false, message: 'Download App not found' });
        }

        downloadApp.deleted = true;
        await downloadApp.save();

        res.status(200).json({ status: true, message: 'Download App deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore a Soft-Deleted Download App Section
const restoreDownloadApp = async (req, res) => {
    try {
        const downloadApp = await DownloadApp.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );

        if (!downloadApp) {
            return res.status(404).json({ status: false, message: 'Download App not found' });
        }

        res.status(200).json({ status: true, message: 'Download App restored successfully', data: downloadApp });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Toggle the Status of Play Store or Apple Store Button
const toggleButtonStatus = async (req, res) => {
    try {
        const { id, buttonType } = req.params;

        const downloadApp = await DownloadApp.findOne({ _id: id, deleted: false });
        if (!downloadApp) {
            return res.status(404).json({ status: false, message: 'Download App not found' });
        }

        if (buttonType === 'playstore') {
            downloadApp.playStoreButton.status = !downloadApp.playStoreButton.status;
        } else if (buttonType === 'applestore') {
            downloadApp.appleStoreButton.status = !downloadApp.appleStoreButton.status;
        } else {
            return res.status(400).json({ status: false, message: 'Invalid button type' });
        }

        await downloadApp.save();

        res.status(200).json({ status: true, message: `Status toggled successfully for ${buttonType}`, data: downloadApp });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error toggling status', error: error.message });
    }
};

module.exports = {
    createOrUpdateDownloadApp,
    getAllDownloadApps,
    getDownloadApp,
    deleteDownloadApp,
    restoreDownloadApp,
    toggleButtonStatus,
};
