const CustomerSettings = require('../../../../Models/System Settings/Buiness Setup/Business Settings/customerSettingsModel');

// Create or Update Customer Settings
const createOrUpdateCustomerSettings = async (req, res) => {
    try {
        const {
            customerWallet,
            customerLoyaltyPoints,
            customerReferralEarnings,
            addRefundAmountToWallet,
            addFundToWallet,
            minimumAddFundAmount,
            maximumAddFundAmount,
            equivalentPointTo1UnitCurrency,
            loyaltyPointEarnOnEachOther,
            minimumPointRequiredToConvert,
            earningsToEachReferral,
        } = req.body;

        let settings = await CustomerSettings.findOne({ deleted: false });

        if (settings) {
            // Update existing record
            Object.assign(settings, {
                customerWallet,
                customerLoyaltyPoints,
                customerReferralEarnings,
                addRefundAmountToWallet,
                addFundToWallet,
                minimumAddFundAmount,
                maximumAddFundAmount,
                equivalentPointTo1UnitCurrency,
                loyaltyPointEarnOnEachOther,
                minimumPointRequiredToConvert,
                earningsToEachReferral,
            });
            await settings.save();
            return res.status(200).json({ status: true, message: 'Customer settings updated successfully', data: settings });
        } else {
            // Create new record
            settings = new CustomerSettings({
                customerWallet,
                customerLoyaltyPoints,
                customerReferralEarnings,
                addRefundAmountToWallet,
                addFundToWallet,
                minimumAddFundAmount,
                maximumAddFundAmount,
                equivalentPointTo1UnitCurrency,
                loyaltyPointEarnOnEachOther,
                minimumPointRequiredToConvert,
                earningsToEachReferral,
            });
            await settings.save();
            return res.status(201).json({ status: true, message: 'Customer settings created successfully', data: settings });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error processing request', error: error.message });
    }
};

// Get Customer Settings
const getCustomerSettings = async (req, res) => {
    try {
        const settings = await CustomerSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Customer settings not found' });
        }
        res.status(200).json({ status: true, data: settings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Soft Delete Customer Settings
const deleteCustomerSettings = async (req, res) => {
    try {
        const settings = await CustomerSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Customer settings not found' });
        }

        settings.deleted = true;
        await settings.save();
        res.status(200).json({ status: true, message: 'Customer settings deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Restore Soft-Deleted Customer Settings
const restoreCustomerSettings = async (req, res) => {
    try {
        const settings = await CustomerSettings.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );

        if (!settings) {
            return res.status(404).json({ status: false, message: 'Customer settings not found' });
        }

        res.status(200).json({ status: true, message: 'Customer settings restored successfully', data: settings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Toggle Customer Wallet
const toggleCustomerWallet = async (req, res) => {
    await toggleBooleanField(req, res, 'customerWallet');
};

// Toggle Customer Loyalty Points
const toggleCustomerLoyaltyPoints = async (req, res) => {
    await toggleBooleanField(req, res, 'customerLoyaltyPoints');
};

// Toggle Customer Referral Earnings
const toggleCustomerReferralEarnings = async (req, res) => {
    await toggleBooleanField(req, res, 'customerReferralEarnings');
};

// Toggle Add Refund Amount to Wallet
const toggleAddRefundAmountToWallet = async (req, res) => {
    await toggleBooleanField(req, res, 'addRefundAmountToWallet');
};

// Toggle Add Fund to Wallet
const toggleAddFundToWallet = async (req, res) => {
    await toggleBooleanField(req, res, 'addFundToWallet');
};

// Helper Function for Toggling Boolean Fields
const toggleBooleanField = async (req, res, field) => {
    try {
        const settings = await CustomerSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Customer settings not found' });
        }

        settings[field] = !settings[field];
        await settings.save();

        res.status(200).json({
            status: true,
            message: `${field} toggled successfully`,
            data: { [field]: settings[field] },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createOrUpdateCustomerSettings,
    getCustomerSettings,
    deleteCustomerSettings,
    restoreCustomerSettings,
    toggleCustomerWallet,
    toggleCustomerLoyaltyPoints,
    toggleCustomerReferralEarnings,
    toggleAddRefundAmountToWallet,
    toggleAddFundToWallet,
};
