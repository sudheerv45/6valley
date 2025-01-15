const AboutUs = require('../../../../Models/System Settings/Pages&Media/Business Pages/aboutUsModel');

const createAboutUs = async (req, res) => {
    try {
        const aboutUs = new AboutUs(req.body);
        await aboutUs.save();
        res.status(201).json({ status: true, message: 'About Us created successfully', data: aboutUs });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating About Us', error: error.message });
    }
};

const getAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.find({ deleted: false });
        res.status(200).json({ status: true, data: aboutUs });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getAboutUsById = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findOne({ _id: req.params.id, deleted: false });
        if (!aboutUs) return res.status(404).json({ status: false, message: 'About Us not found' });
        res.status(200).json({ status: true, data: aboutUs });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!aboutUs) return res.status(404).json({ status: false, message: 'About Us not found' });
        res.status(200).json({ status: true, message: 'About Us updated successfully', data: aboutUs });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating About Us', error: error.message });
    }
};

const deleteAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findById(req.params.id);
        if (!aboutUs) return res.status(404).json({ status: false, message: 'About Us not found' });

        aboutUs.deleted = true;
        await aboutUs.save();
        res.status(200).json({ status: true, message: 'About Us deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createAboutUs,
    getAboutUs,
    getAboutUsById,
    updateAboutUs,
    deleteAboutUs
};
