const ProductSetup = require('../../../../Models/System Settings/Buiness Setup/Business Settings/productSetupModel');

// Add or Update Product Setup
const addOrUpdateProductSetup = async (req, res) => {
    try {
        const existingSetup = await ProductSetup.findOne({ deleted: false });
        if (existingSetup) {
            Object.assign(existingSetup, req.body);
            await existingSetup.save();
            return res.status(200).json({
                status: true,
                message: 'Product setup updated successfully',
                data: existingSetup,
            });
        } else {
            const newSetup = new ProductSetup(req.body);
            await newSetup.save();
            return res.status(201).json({
                status: true,
                message: 'Product setup created successfully',
                data: newSetup,
            });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get Product Setup
const getProductSetup = async (req, res) => {
    try {
        const setup = await ProductSetup.findOne({ deleted: false });
        if (!setup) {
            return res.status(404).json({ status: false, message: 'Product setup not found' });
        }
        res.status(200).json({ status: true, data: setup });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Delete Product Setup (Soft Delete)
const deleteProductSetup = async (req, res) => {
    try {
        const setup = await ProductSetup.findOne({ deleted: false });
        if (!setup) {
            return res.status(404).json({ status: false, message: 'Product setup not found' });
        }
        setup.deleted = true;
        await setup.save();
        res.status(200).json({ status: true, message: 'Product setup deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Restore Product Setup
const restoreProductSetup = async (req, res) => {
    try {
        const setup = await ProductSetup.findOne({ deleted: true });
        if (!setup) {
            return res.status(404).json({ status: false, message: 'No deleted product setup found' });
        }
        setup.deleted = false;
        await setup.save();
        res.status(200).json({ status: true, message: 'Product setup restored successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Sell Digital Product
const toggleSellDigitalProduct = async (req, res) => {
    try {
        const setup = await ProductSetup.findOne({ deleted: false });
        if (!setup) {
            return res.status(404).json({ status: false, message: 'Product setup not found' });
        }
        setup.sellDigitalProduct = !setup.sellDigitalProduct;
        await setup.save();
        res.status(200).json({
            status: true,
            message: 'Sell Digital Product toggled successfully',
            data: { sellDigitalProduct: setup.sellDigitalProduct },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Toggle Show Brand
const toggleShowBrand = async (req, res) => {
    try {
        const setup = await ProductSetup.findOne({ deleted: false });
        if (!setup) {
            return res.status(404).json({ status: false, message: 'Product setup not found' });
        }
        setup.showBrand = !setup.showBrand;
        await setup.save();
        res.status(200).json({
            status: true,
            message: 'Show Brand toggled successfully',
            data: { showBrand: setup.showBrand },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    addOrUpdateProductSetup,
    getProductSetup,
    deleteProductSetup,
    restoreProductSetup,
    toggleSellDigitalProduct,
    toggleShowBrand,
};
