const LoginUrl = require('../../../../Models/System Settings/System Setup/Login Settings/loginUrlModel');

const createLoginUrl = async (req, res) => {
    try {
        const existingUrl = await LoginUrl.findOne({ url: req.body.url, deleted: false });
        if (existingUrl) {
            return res.status(400).json({ status: false, message: 'URL already exists' });
        }

        const loginUrl = new LoginUrl(req.body);
        await loginUrl.save();
        res.status(201).json({ status: true, message: 'Login URL created successfully', data: loginUrl });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Login URL', error: error.message });
    }
};

const getLoginUrls = async (req, res) => {
    try {
        const loginUrls = await LoginUrl.find({ deleted: false });
        res.status(200).json({ status: true, data: loginUrls });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getLoginUrl = async (req, res) => {
    try {
        const loginUrl = await LoginUrl.findOne({ _id: req.params.id, deleted: false });
        if (!loginUrl) return res.status(404).json({ status: false, message: 'Login URL not found' });
        res.status(200).json({ status: true, data: loginUrl });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateLoginUrl = async (req, res) => {
    try {
        const loginUrl = await LoginUrl.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!loginUrl) return res.status(404).json({ status: false, message: 'Login URL not found' });
        res.status(200).json({ status: true, message: 'Login URL updated successfully', data: loginUrl });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating Login URL', error: error.message });
    }
};

const deleteLoginUrl = async (req, res) => {
    try {
        const loginUrl = await LoginUrl.findById(req.params.id);
        if (!loginUrl) return res.status(404).json({ status: false, message: 'Login URL not found' });

        loginUrl.deleted = true;
        await loginUrl.save();
        res.status(200).json({ status: true, message: 'Login URL deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreLoginUrl = async (req, res) => {
    try {
        const loginUrl = await LoginUrl.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );
        if (!loginUrl) return res.status(404).json({ status: false, message: 'Login URL not found' });
        res.status(200).json({ status: true, message: 'Login URL restored successfully', data: loginUrl });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createLoginUrl,
    getLoginUrls,
    getLoginUrl,
    updateLoginUrl,
    deleteLoginUrl,
    restoreLoginUrl
};
