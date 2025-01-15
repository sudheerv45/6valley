const WhySellWithUs = require('../../../../Models/System Settings/Pages&Media/Vendor Registration/whySellWithUsModel');
const path = require('path');
const fs = require('fs');

const createWhySellWithUs = async (req, res) => {
    try {
        const { title, subTitle } = req.body;
        const image = req.file ? req.file.path : null;

        if (!title || !subTitle || !image) {
            return res.status(400).json({ status: false, message: 'Title, Sub-title, and Image are required' });
        }

        const section = new WhySellWithUs({ title, subTitle, image });
        await section.save();

        res.status(201).json({ status: true, message: 'Why Sell With Us created successfully', data: section });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error creating Why Sell With Us', error: error.message });
    }
};

const getWhySellWithUsSections = async (req, res) => {
    try {
        const sections = await WhySellWithUs.find({ deleted: false });
        res.status(200).json({ status: true, data: sections });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getWhySellWithUsSection = async (req, res) => {
    try {
        const section = await WhySellWithUs.findOne({ _id: req.params.id, deleted: false });
        if (!section) {
            return res.status(404).json({ status: false, message: 'Why Sell With Us section not found' });
        }
        res.status(200).json({ status: true, data: section });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateWhySellWithUs = async (req, res) => {
    try {
        const { title, subTitle } = req.body;
        const image = req.file ? req.file.path : null;

        const updateData = { title, subTitle };
        if (image) {
            updateData.image = image;
        }

        const section = await WhySellWithUs.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            updateData,
            { new: true }
        );
        if (!section) {
            return res.status(404).json({ status: false, message: 'Why Sell With Us section not found' });
        }

        res.status(200).json({ status: true, message: 'Why Sell With Us updated successfully', data: section });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error updating Why Sell With Us', error: error.message });
    }
};

const deleteWhySellWithUs = async (req, res) => {
    try {
        const section = await WhySellWithUs.findById(req.params.id);
        if (!section) {
            return res.status(404).json({ status: false, message: 'Why Sell With Us section not found' });
        }

        section.deleted = true;
        await section.save();

        res.status(200).json({ status: true, message: 'Why Sell With Us deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreWhySellWithUs = async (req, res) => {
    try {
        const section = await WhySellWithUs.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );
        if (!section) {
            return res.status(404).json({ status: false, message: 'Why Sell With Us section not found' });
        }

        res.status(200).json({ status: true, message: 'Why Sell With Us restored successfully', data: section });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createWhySellWithUs,
    getWhySellWithUsSections,
    getWhySellWithUsSection,
    updateWhySellWithUs,
    deleteWhySellWithUs,
    restoreWhySellWithUs,
};
