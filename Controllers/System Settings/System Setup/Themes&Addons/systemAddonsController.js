const SystemAddons = require('../../../../Models/System Settings/System Setup/Themes&Addons/systemAddonsModel');
const multer = require('multer');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/addons'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file naming
    }
});
const upload = multer({ storage });

const createSystemAddon = async (req, res) => {
    try {
        const addon = new SystemAddons({
            uploadAddons: req.file.path, // Store the uploaded file path
        });
        await addon.save();
        res.status(201).json({ status: true, message: 'Addon uploaded successfully', data: addon });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error uploading addon', error: error.message });
    }
};

const getSystemAddons = async (req, res) => {
    try {
        const addons = await SystemAddons.find({ deleted: false });
        res.status(200).json({ status: true, data: addons });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getSystemAddon = async (req, res) => {
    try {
        const addon = await SystemAddons.findOne({ _id: req.params.id, deleted: false });
        if (!addon) return res.status(404).json({ status: false, message: 'Addon not found' });
        res.status(200).json({ status: true, data: addon });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateSystemAddon = async (req, res) => {
    try {
        const addon = await SystemAddons.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            { uploadAddons: req.file.path }, // Update with the new file path
            { new: true }
        );
        if (!addon) return res.status(404).json({ status: false, message: 'Addon not found' });
        res.status(200).json({ status: true, message: 'Addon updated successfully', data: addon });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating addon', error: error.message });
    }
};

const deleteSystemAddon = async (req, res) => {
    try {
        const addon = await SystemAddons.findById(req.params.id);
        if (!addon) return res.status(404).json({ status: false, message: 'Addon not found' });

        addon.deleted = true;
        await addon.save();
        res.status(200).json({ status: true, message: 'Addon deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreSystemAddon = async (req, res) => {
    try {
        const addon = await SystemAddons.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );
        if (!addon) return res.status(404).json({ status: false, message: 'Addon not found' });
        res.status(200).json({ status: true, message: 'Addon restored successfully', data: addon });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createSystemAddon,
    getSystemAddons,
    getSystemAddon,
    updateSystemAddon,
    deleteSystemAddon,
    restoreSystemAddon,
    upload
};
