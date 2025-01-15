const VendorRegistrationHeader = require('../../../../Models/System Settings/Pages&Media/Vendor Registration/vendorRegistrationHeaderModel');
const path = require('path');
const fs = require('fs');

const createVendorRegistrationHeader = async (req, res) => {
    try {
        const { title, subTitle } = req.body;
        const image = req.file ? req.file.path : null;

        if (!title || !subTitle || !image) {
            return res.status(400).json({ status: false, message: 'Title, Sub-title, and Image are required' });
        }

        const header = new VendorRegistrationHeader({ title, subTitle, image });
        await header.save();

        res.status(201).json({ status: true, message: 'Vendor Registration Header created successfully', data: header });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error creating Vendor Registration Header', error: error.message });
    }
};

const getVendorRegistrationHeaders = async (req, res) => {
    try {
        const headers = await VendorRegistrationHeader.find({ deleted: false });
        res.status(200).json({ status: true, data: headers });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const getVendorRegistrationHeader = async (req, res) => {
    try {
        const header = await VendorRegistrationHeader.findOne({ _id: req.params.id, deleted: false });
        if (!header) {
            return res.status(404).json({ status: false, message: 'Vendor Registration Header not found' });
        }
        res.status(200).json({ status: true, data: header });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const updateVendorRegistrationHeader = async (req, res) => {
    try {
        const { title, subTitle } = req.body;
        const image = req.file ? req.file.path : null;

        const updateData = { title, subTitle };
        if (image) {
            updateData.image = image;
        }

        const header = await VendorRegistrationHeader.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            updateData,
            { new: true }
        );
        if (!header) {
            return res.status(404).json({ status: false, message: 'Vendor Registration Header not found' });
        }

        res.status(200).json({ status: true, message: 'Vendor Registration Header updated successfully', data: header });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error updating Vendor Registration Header', error: error.message });
    }
};

const deleteVendorRegistrationHeader = async (req, res) => {
    try {
        const header = await VendorRegistrationHeader.findById(req.params.id);
        if (!header) {
            return res.status(404).json({ status: false, message: 'Vendor Registration Header not found' });
        }

        header.deleted = true;
        await header.save();

        res.status(200).json({ status: true, message: 'Vendor Registration Header deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

const restoreVendorRegistrationHeader = async (req, res) => {
    try {
        const header = await VendorRegistrationHeader.findOneAndUpdate(
            { _id: req.params.id, deleted: true },
            { deleted: false },
            { new: true }
        );
        if (!header) {
            return res.status(404).json({ status: false, message: 'Vendor Registration Header not found' });
        }

        res.status(200).json({ status: true, message: 'Vendor Registration Header restored successfully', data: header });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createVendorRegistrationHeader,
    getVendorRegistrationHeaders,
    getVendorRegistrationHeader,
    updateVendorRegistrationHeader,
    deleteVendorRegistrationHeader,
    restoreVendorRegistrationHeader,
};
