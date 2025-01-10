const FlashDeal = require("../Models/FlashDeal");
const Product = require("../Models/Product");

// Create a new Flash Deal
const createFlashDeal = async (req, res) => {
    try {
        const { title, startDate, endDate, products } = req.body;
        const image = req.file ? req.file.path : null;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const flashDeal = new FlashDeal({
            title,
            startDate,
            endDate,
            image,
            products, // Array of product objects with productId and discount
        });

        await flashDeal.save();
        res.status(201).json({ message: "Flash deal created successfully", flashDeal });
    } catch (error) {
        res.status(500).json({ message: "Failed to create flash deal", error: error.message });
    }
};

// Get all Flash Deals
const getAllFlashDeals = async (req, res) => {
    try {
        const flashDeals = await FlashDeal.find().populate("products.productId");
        res.status(200).json({ message: " All flash deals retrieved Succesfully",flashDeals });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve flash deals", error: error.message });
    }
};

// Get a single Flash Deal by ID
const getFlashDealById = async (req, res) => {
    try {
        const { id } = req.params;
        const flashDeal = await FlashDeal.findById(id).populate("products.productId");

        if (!flashDeal) {
            return res.status(404).json({ message: "Flash deal not found" });
        }

        res.status(200).json({ flashDeal });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve flash deal", error: error.message });
    }
};

// Update a Flash Deal
const updateFlashDeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, startDate, endDate, products } = req.body;
        const image = req.file ? req.file.path : undefined;

        const flashDeal = await FlashDeal.findById(id);

        if (!flashDeal) {
            return res.status(404).json({ message: "Flash deal not found" });
        }

        flashDeal.title = title || flashDeal.title;
        flashDeal.startDate = startDate || flashDeal.startDate;
        flashDeal.endDate = endDate || flashDeal.endDate;
        flashDeal.image = image || flashDeal.image;
        flashDeal.products = products || flashDeal.products;
        flashDeal.updatedAt = new Date();

        await flashDeal.save();
        res.status(200).json({ message: "Flash deal updated successfully", flashDeal });
    } catch (error) {
        res.status(500).json({ message: "Failed to update flash deal", error: error.message });
    }
};

// Delete a Flash Deal
const deleteFlashDeal = async (req, res) => {
    try {
        const { id } = req.params;

        const flashDeal = await FlashDeal.findByIdAndDelete(id);

        if (!flashDeal) {
            return res.status(404).json({ message: "Flash deal not found" });
        }

        res.status(200).json({ message: "Flash deal deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete flash deal", error: error.message });
    }
};

module.exports = {createFlashDeal, getAllFlashDeals, getFlashDealById, updateFlashDeal, deleteFlashDeal};