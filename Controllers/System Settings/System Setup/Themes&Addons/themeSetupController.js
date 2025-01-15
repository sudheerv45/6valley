const ThemeSetup = require('../../../../Models/System Settings/System Setup/Themes&Addons/themeSetupModel');
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/themes'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file naming
    }
});
const upload = multer({ storage });

const createThemeSetup = async (req, res) => {
    try {
        const theme = new ThemeSetup({
            uploadTheme: req.file.path // Store the uploaded file path
        });
        await theme.save();
        res.status(201).json({ status: true, message: 'Theme uploaded successfully', data: theme });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error uploading theme', error: error.message });
    }
};

const getThemeSetups = async (req, res) => {
    try {
        const themes = await ThemeSetup.find({ deleted: false });
        res.status(200).json({ status: true, data: themes });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getThemeSetup = async (req, res) => {
    try {
        const theme = await ThemeSetup.findOne({ _id: req.params.id, deleted: false });
        if (!theme) return res.status(404).json({ status: false, message: 'Theme not found' });
        res.status(200).json({ status: true, data: theme });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateThemeSetup = async (req, res) => {
    try {
        const theme = await ThemeSetup.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            { uploadTheme: req.file.path }, // Update with the new file path
            { new: true }
        );
        if (!theme) return res.status(404).json({ status: false, message: 'Theme not found' });
        res.status(200).json({ status: true, message: 'Theme updated successfully', data: theme });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating theme', error: error.message });
    }
};

const deleteThemeSetup = async (req, res) => {
    try {
        const theme = await ThemeSetup.findById(req.params.id);
        if (!theme) return res.status(404).json({ status: false, message: 'Theme not found' });

        theme.deleted = true;
        await theme.save();
        res.status(200).json({ status: true, message: 'Theme deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreThemeSetup = async (req, res) => {
    try {
        const theme = await ThemeSetup.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );
        if (!theme) return res.status(404).json({ status: false, message: 'Theme not found' });
        res.status(200).json({ status: true, message: 'Theme restored successfully', data: theme });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createThemeSetup,
    getThemeSetups,
    getThemeSetup,
    updateThemeSetup,
    deleteThemeSetup,
    restoreThemeSetup,
};
