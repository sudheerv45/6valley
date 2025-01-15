const VendorSettings = require('../../../../Models/System Settings/Buiness Setup/Business Settings/vendorSettingModel');

// Add or Update Vendor Settings
const createOrUpdateVendorSettings = async (req, res) => {
    try {
        const settings = await VendorSettings.findOne({ deleted: false });

        if (settings) {
            // Update existing record
            Object.assign(settings, req.body);
            await settings.save();
            return res.status(200).json({
                status: true,
                message: 'Vendor settings updated successfully',
                data: settings,
            });
        } else {
            // Create a new record
            const newSettings = new VendorSettings(req.body);
            await newSettings.save();
            return res.status(201).json({
                status: true,
                message: 'Vendor settings created successfully',
                data: newSettings,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Get Vendor Settings
const getVendorSettings = async (req, res) => {
    try {
        const settings = await VendorSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Vendor settings not found' });
        }
        res.status(200).json({ status: true, data: settings });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Soft Delete Vendor Settings
const deleteVendorSettings = async (req, res) => {
    try {
        const settings = await VendorSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Vendor settings not found' });
        }
        settings.deleted = true;
        await settings.save();
        res.status(200).json({ status: true, message: 'Vendor settings deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Restore Vendor Settings
const restoreVendorSettings = async (req, res) => {
    try {
        const settings = await VendorSettings.findOne({ deleted: true });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'No deleted vendor settings found' });
        }
        settings.deleted = false;
        await settings.save();
        res.status(200).json({ status: true, message: 'Vendor settings restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Enable POS in Vendor Panel
const toggleEnablePOSInVendorPanel = async (req, res) => {
    try {
        const settings = await VendorSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Vendor settings not found' });
        }
        settings.enablePOSInVendorPanel = !settings.enablePOSInVendorPanel;
        await settings.save();
        res.status(200).json({
            status: true,
            message: 'enablePOSInVendorPanel toggled successfully',
            data: { enablePOSInVendorPanel: settings.enablePOSInVendorPanel },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Vendor Registration
const toggleVendorRegistration = async (req, res) => {
    try {
        const settings = await VendorSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Vendor settings not found' });
        }
        settings.vendorRegistration = !settings.vendorRegistration;
        await settings.save();
        res.status(200).json({
            status: true,
            message: 'vendorRegistration toggled successfully',
            data: { vendorRegistration: settings.vendorRegistration },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Set Minimum Order Amount
const toggleSetMinimumOrderAmount = async (req, res) => {
    try {
        const settings = await VendorSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Vendor settings not found' });
        }
        settings.setMinimumOrderAmount = !settings.setMinimumOrderAmount;
        await settings.save();
        res.status(200).json({
            status: true,
            message: 'setMinimumOrderAmount toggled successfully',
            data: { setMinimumOrderAmount: settings.setMinimumOrderAmount },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Vendor Can Reply on Review
const toggleVendorCanReplyOnReview = async (req, res) => {
    try {
        const settings = await VendorSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Vendor settings not found' });
        }
        settings.vendorCanReplyOnReview = !settings.vendorCanReplyOnReview;
        await settings.save();
        res.status(200).json({
            status: true,
            message: 'vendorCanReplyOnReview toggled successfully',
            data: { vendorCanReplyOnReview: settings.vendorCanReplyOnReview },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle New Product
const toggleNewProduct = async (req, res) => {
    try {
        const settings = await VendorSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Vendor settings not found' });
        }
        settings.newProduct = !settings.newProduct;
        await settings.save();
        res.status(200).json({
            status: true,
            message: 'newProduct toggled successfully',
            data: { newProduct: settings.newProduct },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Product Wise Shipping Cost
const toggleProductWiseShippingCost = async (req, res) => {
    try {
        const settings = await VendorSettings.findOne({ deleted: false });
        if (!settings) {
            return res.status(404).json({ status: false, message: 'Vendor settings not found' });
        }
        settings.productWiseShippingCost = !settings.productWiseShippingCost;
        await settings.save();
        res.status(200).json({
            status: true,
            message: 'productWiseShippingCost toggled successfully',
            data: { productWiseShippingCost: settings.productWiseShippingCost },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};


module.exports = {
    createOrUpdateVendorSettings,
    getVendorSettings,
    deleteVendorSettings,
    restoreVendorSettings,
    toggleEnablePOSInVendorPanel,
    toggleVendorRegistration,
    toggleSetMinimumOrderAmount,
    toggleVendorCanReplyOnReview,
    toggleNewProduct,
    toggleProductWiseShippingCost,
};
