const DealOfTheDay = require("../Models/DealOfTheDay");

// Create a new Deal of the Day
const createDeal = async (req, res) => {
    try {
        const { title, products, status } = req.body;

        const deal = new DealOfTheDay({
            title,
            products,
            status: status || "active",
        });

        await deal.save();
        res.status(201).json({ message: "Deal of the Day created successfully", deal });
    } catch (error) {
        res.status(500).json({ message: "Failed to create deal", error: error.message });
    }
};

// Get all Deals of the Day
const getAllDeals = async (req, res) => {
    try {
        const deals = await DealOfTheDay.find().populate("products.productId");
        res.status(200).json({ message:"All Deals retrieved Succesfully", deals });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve deals", error: error.message });
    }
};

// Get a single Deal of the Day by ID
const getDealById = async (req, res) => {
    try {
        const { id } = req.params;
        const deal = await DealOfTheDay.findById(id).populate("products.productId");

        if (!deal) {
            return res.status(404).json({ message: "Deal not found" });
        }

        res.status(200).json({ deal });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve deal", error: error.message });
    }
};

// Update a Deal of the Day
const updateDeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, products, status } = req.body;

        const deal = await DealOfTheDay.findById(id);

        if (!deal) {
            return res.status(404).json({ message: "Deal not found" });
        }

        deal.title = title || deal.title;
        deal.products = products || deal.products;
        deal.status = status || deal.status;
        deal.updatedAt = new Date();

        await deal.save();
        res.status(200).json({ message: "Deal updated successfully", deal });
    } catch (error) {
        res.status(500).json({ message: "Failed to update deal", error: error.message });
    }
};

// Delete a Deal of the Day
const deleteDeal = async (req, res) => {
    try {
        const { id } = req.params;

        const deal = await DealOfTheDay.findByIdAndDelete(id);

        if (!deal) {
            return res.status(404).json({ message: "Deal not found" });
        }

        res.status(200).json({ message: "Deal deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete deal", error: error.message });
    }
};

module.exports = {deleteDeal, createDeal, getAllDeals, getDealById, updateDeal};