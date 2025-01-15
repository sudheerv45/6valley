// File: controllers/CustomerLoginController.js

const CustomerLogin = require('../../../../Models/System Settings/System Setup/Login Settings/customerLoginModel');

const createCustomerLogin = async (req, res) => {
    try {
        const newLogin = new CustomerLogin(req.body);
        await newLogin.save();
        res.status(201).json({ status: true, message: 'Customer Login created successfully', data: newLogin });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating customer login', error: error.message });
    }
};

const getCustomerLogins = async (req, res) => {
    try {
        const customerLogins = await CustomerLogin.find({ deleted: false });
        res.status(200).json({ status: true, data: customerLogins });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getCustomerLogin = async (req, res) => {
    try {
        const customerLogin = await CustomerLogin.findOne({ _id: req.params.id, deleted: false });
        if (!customerLogin) return res.status(404).json({ status: false, message: 'Customer Login not found' });
        res.status(200).json({ status: true, data: customerLogin });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateCustomerLogin = async (req, res) => {
    try {
        const customerLogin = await CustomerLogin.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );
        if (!customerLogin) return res.status(404).json({ status: false, message: 'Customer Login not found' });
        res.status(200).json({ status: true, message: 'Customer Login updated successfully', data: customerLogin });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const deleteCustomerLogin = async (req, res) => {
    try {
        const customerLogin = await CustomerLogin.findById(req.params.id);
        if (!customerLogin) return res.status(404).json({ status: false, message: 'Customer Login not found' });

        customerLogin.deleted = true;
        await customerLogin.save();
        res.status(200).json({ status: true, message: 'Customer Login deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreCustomerLogin = async (req, res) => {
    try {
        const customerLogin = await CustomerLogin.findByIdAndUpdate(
            req.params.id,
            { deleted: false },
            { new: true }
        );
        if (!customerLogin) return res.status(404).json({ status: false, message: 'Customer Login not found' });
        res.status(200).json({ status: true, message: 'Customer Login restored successfully', data: customerLogin });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const toggleSubLoginTypeStatus = async (req, res) => {
    try {
        const customerLogin = await CustomerLogin.findById(req.params.id);
        if (!customerLogin) return res.status(404).json({ status: false, message: 'Customer Login not found' });

        const subLoginType = customerLogin.subLoginType.id(req.body.subLoginTypeId);
        if (!subLoginType) return res.status(404).json({ status: false, message: 'Sub-login type not found' });

        subLoginType.status = !subLoginType.status; // Toggle the status
        await customerLogin.save();
        res.status(200).json({ status: true, message: 'Sub-login type status toggled successfully', data: customerLogin });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createCustomerLogin,
    getCustomerLogins,
    getCustomerLogin,
    updateCustomerLogin,
    deleteCustomerLogin,
    restoreCustomerLogin,
    toggleSubLoginTypeStatus
};
