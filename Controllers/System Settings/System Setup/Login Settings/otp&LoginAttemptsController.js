const OtpLoginSettings = require('../../../../Models/System Settings/System Setup/Login Settings/otp&LoginAttemptsModel');

const createOrUpdateOtpLoginSettings = async (req, res) => {
    try {
        const otpLoginSettings = await OtpLoginSettings.findOne({ deleted: false });

        if (otpLoginSettings) {
            // If existing record found, update it
            const updatedSettings = await OtpLoginSettings.findOneAndUpdate(
                { deleted: false },
                req.body,
                { new: true }
            );
            return res.status(200).json({ status: true, message: 'OtpLoginSettings updated successfully', data: updatedSettings });
        } else {
            // If no record found, create new
            const newSettings = new OtpLoginSettings(req.body);
            await newSettings.save();
            return res.status(201).json({ status: true, message: 'OtpLoginSettings created successfully', data: newSettings });
        }
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error handling OtpLoginSettings', error: error.message });
    }
};


const getOtpLoginSettings = async (req, res) => {
    try {
        const otpLoginSettings = await OtpLoginSettings.findOne({ deleted: false });
        if (!otpLoginSettings) {
            return res.status(404).json({ status: false, message: 'OtpLoginSettings not found' });
        }
        res.status(200).json({ status: true, data: otpLoginSettings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateOtpLoginSettings = async (req, res) => {
    try {
        const otpLoginSettings = await OtpLoginSettings.findOneAndUpdate(
            { deleted: false },
            req.body,
            { new: true }
        );
        if (!otpLoginSettings) {
            return res.status(404).json({ status: false, message: 'OtpLoginSettings not found' });
        }
        res.status(200).json({ status: true, message: 'OtpLoginSettings updated successfully', data: otpLoginSettings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const deleteOtpLoginSettings = async (req, res) => {
    try {
        const otpLoginSettings = await OtpLoginSettings.findOne({ deleted: false });
        if (!otpLoginSettings) {
            return res.status(404).json({ status: false, message: 'OtpLoginSettings not found' });
        }

        otpLoginSettings.deleted = true;
        await otpLoginSettings.save();
        res.status(200).json({ status: true, message: 'OtpLoginSettings deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreOtpLoginSettings = async (req, res) => {
    try {
        const otpLoginSettings = await OtpLoginSettings.findOneAndUpdate(
            { deleted: true },
            { deleted: false },
            { new: true }
        );
        if (!otpLoginSettings) {
            return res.status(404).json({ status: false, message: 'OtpLoginSettings not found' });
        }
        res.status(200).json({ status: true, message: 'OtpLoginSettings restored successfully', data: otpLoginSettings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createOrUpdateOtpLoginSettings,
    getOtpLoginSettings,
    updateOtpLoginSettings,
    deleteOtpLoginSettings,
    restoreOtpLoginSettings
};
