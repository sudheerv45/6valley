// File: controllers/CookieController.js

const Cookie = require('../../../../Models/System Settings/System Setup/System Settings/cookieModel');

const createOrUpdateCookie = async (req, res) => {
    try {
        const existingCookie = await Cookie.findOne({ deleted: false });

        if (existingCookie) {
            // Update if a record exists
            const updatedCookie = await Cookie.findByIdAndUpdate(
                existingCookie._id,
                req.body,
                { new: true }
            );
            res.status(200).json({ status: true, message: 'Cookie updated successfully', data: updatedCookie });
        } else {
            // Create a new record if no existing record
            const newCookie = new Cookie(req.body);
            await newCookie.save();
            res.status(201).json({ status: true, message: 'Cookie created successfully', data: newCookie });
        }
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating or updating cookie', error: error.message });
    }
};

const getCookies = async (req, res) => {
    try {
        const cookies = await Cookie.find({ deleted: false });
        res.status(200).json({ status: true, data: cookies });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getCookie = async (req, res) => {
    try {
        const cookie = await Cookie.findOne({ _id: req.params.id, deleted: false });
        if (!cookie) return res.status(404).json({ status: false, message: 'Cookie not found' });
        res.status(200).json({ status: true, data: cookie });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateCookie = async (req, res) => {
    try {
        const cookie = await Cookie.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!cookie) return res.status(404).json({ status: false, message: 'Cookie not found' });
        res.status(200).json({ status: true, message: 'Cookie updated successfully', data: cookie });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const deleteCookie = async (req, res) => {
    try {
        const cookie = await Cookie.findById(req.params.id);
        if (!cookie) return res.status(404).json({ status: false, message: 'Cookie not found' });

        cookie.deleted = true;
        await cookie.save();
        res.status(200).json({ status: true, message: 'Cookie deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreCookie = async (req, res) => {
    try {
        const cookie = await Cookie.findByIdAndUpdate(
            req.params.id,
            { deleted: false },
            { new: true }
        );
        if (!cookie) return res.status(404).json({ status: false, message: 'Cookie not found' });
        res.status(200).json({ status: true, message: 'Cookie restored successfully', data: cookie });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const toggleCookieStatus = async (req, res) => {
    try {
        const cookie = await Cookie.findById(req.params.id);
        if (!cookie) return res.status(404).json({ status: false, message: 'Cookie not found' });

        cookie.status = !cookie.status;
        await cookie.save();
        res.status(200).json({ status: true, message: `Cookie status toggled successfully`, data: cookie });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createOrUpdateCookie,
    getCookies,
    getCookie,
    updateCookie,
    deleteCookie,
    restoreCookie,
    toggleCookieStatus
};
