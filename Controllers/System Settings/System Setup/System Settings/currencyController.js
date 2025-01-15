// File: controllers/CurrencyController.js

const Currency = require('../../../../Models/System Settings/System Setup/System Settings/currencyModel');

const createCurrency = async (req, res) => {
    try {
        const currency = new Currency(req.body);
        await currency.save();
        res.status(201).json({ status: true, message: 'Currency created successfully', data: currency });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating currency', error: error.message });
    }
};

const getCurrencies = async (req, res) => {
    try {
        const currencies = await Currency.find({ deleted: false });
        res.status(200).json({ status: true, data: currencies });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getCurrency = async (req, res) => {
    try {
        const currency = await Currency.findOne({ _id: req.params.id, deleted: false });
        if (!currency) return res.status(404).json({ status: false, message: 'Currency not found' });
        res.status(200).json({ status: true, data: currency });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateCurrency = async (req, res) => {
    try {
        const currency = await Currency.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!currency) return res.status(404).json({ status: false, message: 'Currency not found' });
        res.status(200).json({ status: true, message: 'Currency updated successfully', data: currency });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const deleteCurrency = async (req, res) => {
    try {
        const currency = await Currency.findById(req.params.id);
        if (!currency) return res.status(404).json({ status: false, message: 'Currency not found' });

        currency.deleted = true;
        await currency.save();
        res.status(200).json({ status: true, message: 'Currency deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreCurrency = async (req, res) => {
    try {
        const currency = await Currency.findByIdAndUpdate(
            req.params.id,
            { deleted: false },
            { new: true }
        );
        if (!currency) return res.status(404).json({ status: false, message: 'Currency not found' });
        res.status(200).json({ status: true, message: 'Currency restored successfully', data: currency });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const toggleCurrencyStatus = async (req, res) => {
    try {
        const currency = await Currency.findById(req.params.id);
        if (!currency) return res.status(404).json({ status: false, message: 'Currency not found' });

        currency.status = !currency.status;
        await currency.save();
        res.status(200).json({ status: true, message: `Currency status toggled successfully`, data: currency });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createCurrency,
    getCurrencies,
    getCurrency,
    updateCurrency,
    deleteCurrency,
    restoreCurrency,
    toggleCurrencyStatus
};
