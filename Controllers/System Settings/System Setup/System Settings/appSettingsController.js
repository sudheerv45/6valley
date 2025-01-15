const AppSettings = require('../../../../Models/System Settings/System Setup/System Settings/appSettingsModel');

// Create App Settings
const createAppSettings = async (req, res) => {
    try {
        const appSettings = new AppSettings(req.body);
        await appSettings.save();
        res.status(201).json({ status: true, message: 'App Settings created successfully', data: appSettings });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating App Settings', error: error.message });
    }
};

// Get All App Settings
const getAppSettings = async (req, res) => {
    try {
        const appSettings = await AppSettings.find({ deleted: false });
        res.status(200).json({ status: true, data: appSettings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Get App Settings by ID
const getAppSettingsById = async (req, res) => {
    try {
        const appSettings = await AppSettings.findOne({ _id: req.params.id, deleted: false });
        if (!appSettings) return res.status(404).json({ status: false, message: 'App Settings not found' });
        res.status(200).json({ status: true, data: appSettings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Update App Settings
const updateAppSettings = async (req, res) => {
    try {
        const appSettings = await AppSettings.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!appSettings) return res.status(404).json({ status: false, message: 'App Settings not found' });
        res.status(200).json({ status: true, message: 'App Settings updated successfully', data: appSettings });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating App Settings', error: error.message });
    }
};

// Delete (Soft Delete) App Settings
const deleteAppSettings = async (req, res) => {
    try {
        const appSettings = await AppSettings.findById(req.params.id);
        if (!appSettings) return res.status(404).json({ status: false, message: 'App Settings not found' });

        appSettings.deleted = true;
        await appSettings.save();
        res.status(200).json({ status: true, message: 'App Settings deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore App Settings
const restoreAppSettings = async (req, res) => {
    try {
        const appSettings = await AppSettings.findOne({ _id: req.params.id, deleted: true });
        if (!appSettings) return res.status(404).json({ status: false, message: 'App Settings not found' });

        appSettings.deleted = false;
        await appSettings.save();
        res.status(200).json({ status: true, message: 'App Settings restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createAppSettings,
    getAppSettings,
    getAppSettingsById,
    updateAppSettings,
    deleteAppSettings,
    restoreAppSettings,
};
