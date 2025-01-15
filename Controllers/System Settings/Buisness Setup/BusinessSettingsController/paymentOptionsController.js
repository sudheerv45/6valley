const PaymentOptions = require('../../../../Models/System Settings/Buiness Setup/Business Settings/paymentOptionsModel');

// Add or Update Payment Options
const addOrUpdatePaymentOptions = async (req, res) => {
    try {
        const existingOptions = await PaymentOptions.findOne({ deleted: false });
        if (existingOptions) {
            Object.assign(existingOptions, req.body);
            await existingOptions.save();
            return res.status(200).json({
                status: true,
                message: 'Payment options updated successfully',
                data: existingOptions,
            });
        } else {
            const newOptions = new PaymentOptions(req.body);
            await newOptions.save();
            return res.status(201).json({
                status: true,
                message: 'Payment options created successfully',
                data: newOptions,
            });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get Payment Options
const getPaymentOptions = async (req, res) => {
    try {
        const options = await PaymentOptions.findOne({ deleted: false });
        if (!options) {
            return res.status(404).json({ status: false, message: 'Payment options not found' });
        }
        res.status(200).json({ status: true, data: options });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Delete Payment Options (Soft Delete)
const deletePaymentOptions = async (req, res) => {
    try {
        const options = await PaymentOptions.findOne({ deleted: false });
        if (!options) {
            return res.status(404).json({ status: false, message: 'Payment options not found' });
        }
        options.deleted = true;
        await options.save();
        res.status(200).json({ status: true, message: 'Payment options deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Restore Payment Options
const restorePaymentOptions = async (req, res) => {
    try {
        const options = await PaymentOptions.findOne({ deleted: true });
        if (!options) {
            return res.status(404).json({ status: false, message: 'No deleted payment options found' });
        }
        options.deleted = false;
        await options.save();
        res.status(200).json({ status: true, message: 'Payment options restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Cash On Delivery
const toggleCashOnDelivery = async (req, res) => {
    try {
        const options = await PaymentOptions.findOne({ deleted: false });
        if (!options) {
            return res.status(404).json({ status: false, message: 'Payment options not found' });
        }
        options.cashOnDelivery = !options.cashOnDelivery;
        await options.save();
        res.status(200).json({
            status: true,
            message: 'Cash on Delivery toggled successfully',
            data: { cashOnDelivery: options.cashOnDelivery },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Digital Payment
const toggleDigitalPayment = async (req, res) => {
    try {
        const options = await PaymentOptions.findOne({ deleted: false });
        if (!options) {
            return res.status(404).json({ status: false, message: 'Payment options not found' });
        }
        options.digitalPayment = !options.digitalPayment;
        await options.save();
        res.status(200).json({
            status: true,
            message: 'Digital Payment toggled successfully',
            data: { digitalPayment: options.digitalPayment },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Offline Payment
const toggleOfflinePayment = async (req, res) => {
    try {
        const options = await PaymentOptions.findOne({ deleted: false });
        if (!options) {
            return res.status(404).json({ status: false, message: 'Payment options not found' });
        }
        options.offlinePayment = !options.offlinePayment;
        await options.save();
        res.status(200).json({
            status: true,
            message: 'Offline Payment toggled successfully',
            data: { offlinePayment: options.offlinePayment },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    addOrUpdatePaymentOptions,
    getPaymentOptions,
    deletePaymentOptions,
    restorePaymentOptions,
    toggleCashOnDelivery,
    toggleDigitalPayment,
    toggleOfflinePayment,
};
