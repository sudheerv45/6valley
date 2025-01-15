// File: controllers/LanguageController.js

const Language = require('../../../../Models/System Settings/System Setup/System Settings/languageModel');

const createLanguage = async (req, res) => {
    try {
        const language = new Language(req.body);
        await language.save();
        res.status(201).json({ status: true, message: 'Language created successfully', data: language });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Language', error: error.message });
    }
};

const getLanguages = async (req, res) => {
    try {
        const languages = await Language.find({ deleted: false });
        res.status(200).json({ status: true, data: languages });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getLanguage = async (req, res) => {
    try {
        const language = await Language.findOne({ _id: req.params.id, deleted: false });
        if (!language) return res.status(404).json({ status: false, message: 'Language not found' });
        res.status(200).json({ status: true, data: language });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateLanguage = async (req, res) => {
    try {
        const language = await Language.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!language) return res.status(404).json({ status: false, message: 'Language not found' });
        res.status(200).json({ status: true, message: 'Language updated successfully', data: language });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const deleteLanguage = async (req, res) => {
    try {
        const language = await Language.findById(req.params.id);
        if (!language) return res.status(404).json({ status: false, message: 'Language not found' });

        language.deleted = true;
        await language.save();
        res.status(200).json({ status: true, message: 'Language deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreLanguage = async (req, res) => {
    try {
        const language = await Language.findByIdAndUpdate(
            req.params.id,
            { deleted: false },
            { new: true }
        );
        if (!language) return res.status(404).json({ status: false, message: 'Language not found' });
        res.status(200).json({ status: true, message: 'Language restored successfully', data: language });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createLanguage,
    getLanguages,
    getLanguage,
    updateLanguage,
    deleteLanguage,
    restoreLanguage
};
