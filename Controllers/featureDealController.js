const FeatureDeal = require("../Models/FeatureDeal");

// Create a new Feature Deal
const createFeatureDeal = async (req, res) => {
    try {
        const { title, startDate, endDate, products, status } = req.body;

        const featureDeal = new FeatureDeal({
            title,
            startDate,
            endDate,
            products,
            status: status || "active",
        });

        await featureDeal.save();
        res.status(201).json({ message: "Feature Deal created successfully", featureDeal });
    } catch (error) {
        res.status(500).json({ message: "Failed to create feature deal", error: error.message });
    }
};

// Get all Feature Deals
const getAllFeatureDeals = async (req, res) => {
    try {
        const featureDeals = await FeatureDeal.find().populate("products.productId");
        res.status(200).json({ featureDeals });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve feature deals", error: error.message });
    }
};

// Get a single Feature Deal by ID
const getFeatureDealById = async (req, res) => {
    try {
        const { id } = req.params;
        const featureDeal = await FeatureDeal.findById(id).populate("products.productId");

        if (!featureDeal) {
            return res.status(404).json({ message: "Feature Deal not found" });
        }

        res.status(200).json({ featureDeal });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve feature deal", error: error.message });
    }
};

// Update a Feature Deal
const updateFeatureDeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, startDate, endDate, products, status } = req.body;

        const featureDeal = await FeatureDeal.findById(id);

        if (!featureDeal) {
            return res.status(404).json({ message: "Feature Deal not found" });
        }

        featureDeal.title = title || featureDeal.title;
        featureDeal.startDate = startDate || featureDeal.startDate;
        featureDeal.endDate = endDate || featureDeal.endDate;
        featureDeal.products = products || featureDeal.products;
        featureDeal.status = status || featureDeal.status;
        featureDeal.updatedAt = new Date();

        await featureDeal.save();
        res.status(200).json({ message: "Feature Deal updated successfully", featureDeal });
    } catch (error) {
        res.status(500).json({ message: "Failed to update feature deal", error: error.message });
    }
};

// Delete a Feature Deal
const deleteFeatureDeal = async (req, res) => {
    try {
        const { id } = req.params;

        const featureDeal = await FeatureDeal.findByIdAndDelete(id);

        if (!featureDeal) {
            return res.status(404).json({ message: "Feature Deal not found" });
        }

        res.status(200).json({ message: "Feature Deal deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete feature deal", error: error.message });
    }
};

module.exports = {createFeatureDeal, getAllFeatureDeals, getFeatureDealById, updateFeatureDeal, deleteFeatureDeal};