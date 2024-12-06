const Brand = require('../Models/brandModel');

// CREATE a new brand
const addBrand = async (req, res) => {
    try {
        const brand = new Brand(req.body);
        await brand.save();
        res.status(201).json(brand);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ all brands (excluding soft-deleted)
const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find({ isDeleted: false });
        res.json(brands);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ a specific brand by ID (if not soft-deleted)
const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findOne({
            _id: req.params.id,
            isDeleted: false,
        });
        if (!brand) return res.status(404).json({ error: 'Brand not found' });
        res.json(brand);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a brand by ID
const updateBrand = async (req, res) => {
    try {
        const updatedBrand = await Brand.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            req.body,
            { new: true }
        );
        if (!updatedBrand) return res.status(404).json({ error: 'Brand not found' });
        res.json(updatedBrand);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE a brand by ID (soft delete)
const deleteBrand = async (req, res) => {
    try {
        const deletedBrand = await Brand.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!deletedBrand) return res.status(404).json({ error: 'Brand not found' });
        res.json({ message: 'Brand deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// RESTORE a soft-deleted brand by ID
const restoreBrand = async (req, res) => {
    try {
        const restoredBrand = await Brand.findOneAndUpdate(
            { _id: req.params.id, isDeleted: true },
            { isDeleted: false },
            { new: true }
        );
        if (!restoredBrand)
            return res.status(404).json({ error: 'Brand not found or already active' });
        res.json({ message: 'Brand restored successfully', restoredBrand });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ a specific brand by name
const getBrandByName = async (req, res) => {
    try {
        const { brandName } = req.params;
        const brand = await Brand.findOne({
            brandName: new RegExp(`^${brandName}$`, 'i'), // Case-insensitive match
            isDeleted: false,
        });
        if (!brand) return res.status(404).json({ error: 'Brand not found' });
        res.json(brand);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    addBrand,
    getBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
    restoreBrand,
    getBrandByName
};
