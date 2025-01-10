const ClearanceSale = require("../Models/ClearanceSale");

// Create a new Clearance Sale
const createClearanceSale = async (req, res) => {
    try {
        const { duration, discountType, discountAmount, offerActiveTime, startTime, endTime, products, status } = req.body;

        // Validation for conditional fields
        if (discountType === "flat" && (!discountAmount || discountAmount <= 0)) {
            return res.status(400).json({ message: "Flat discount requires a valid discount amount in percentage." });
        }
        if (offerActiveTime === "specific" && (!startTime || !endTime)) {
            return res.status(400).json({ message: "Specific active time requires start and end times." });
        }

        const clearanceSale = new ClearanceSale({
            duration,
            discountType,
            discountAmount: discountType === "flat" ? discountAmount : null,
            offerActiveTime,
            startTime: offerActiveTime === "specific" ? startTime : null,
            endTime: offerActiveTime === "specific" ? endTime : null,
            products,
            status: status || "active",
        });

        await clearanceSale.save();
        res.status(201).json({ message: "Clearance Sale created successfully", clearanceSale });
    } catch (error) {
        res.status(500).json({ message: "Failed to create clearance sale", error: error.message });
    }
};

// Get all Clearance Sales
const getAllClearanceSales = async (req, res) => {
    try {
        const clearanceSales = await ClearanceSale.find().populate("products.productId");
        res.status(200).json({ clearanceSales });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve clearance sales", error: error.message });
    }
};

// Get a single Clearance Sale by ID
const getClearanceSaleById = async (req, res) => {
    try {
        const { id } = req.params;
        const clearanceSale = await ClearanceSale.findById(id).populate("products.productId");

        if (!clearanceSale) {
            return res.status(404).json({ message: "Clearance Sale not found" });
        }

        res.status(200).json({ clearanceSale });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve clearance sale", error: error.message });
    }
};

// Update a Clearance Sale
const updateClearanceSale = async (req, res) => {
    try {
        const { id } = req.params;
        const { duration, discountType, discountAmount, offerActiveTime, startTime, endTime, products, status } = req.body;

        const clearanceSale = await ClearanceSale.findById(id);

        if (!clearanceSale) {
            return res.status(404).json({ message: "Clearance Sale not found" });
        }

        // Update fields with conditional validation
        clearanceSale.duration = duration || clearanceSale.duration;
        clearanceSale.discountType = discountType || clearanceSale.discountType;

        if (clearanceSale.discountType === "flat") {
            clearanceSale.discountAmount = discountAmount || clearanceSale.discountAmount;
        } else {
            clearanceSale.discountAmount = null;
        }

        clearanceSale.offerActiveTime = offerActiveTime || clearanceSale.offerActiveTime;

        if (clearanceSale.offerActiveTime === "specific") {
            clearanceSale.startTime = startTime || clearanceSale.startTime;
            clearanceSale.endTime = endTime || clearanceSale.endTime;
        } else {
            clearanceSale.startTime = null;
            clearanceSale.endTime = null;
        }

        clearanceSale.products = products || clearanceSale.products;
        clearanceSale.status = status || clearanceSale.status;
        clearanceSale.updatedAt = new Date();

        await clearanceSale.save();
        res.status(200).json({ message: "Clearance Sale updated successfully", clearanceSale });
    } catch (error) {
        res.status(500).json({ message: "Failed to update clearance sale", error: error.message });
    }
};

// Delete a Clearance Sale
const deleteClearanceSale = async (req, res) => {
    try {
        const { id } = req.params;

        const clearanceSale = await ClearanceSale.findByIdAndDelete(id);

        if (!clearanceSale) {
            return res.status(404).json({ message: "Clearance Sale not found" });
        }

        res.status(200).json({ message: "Clearance Sale deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete clearance sale", error: error.message });
    }
};

module.exports = {createClearanceSale, updateClearanceSale, getAllClearanceSales, getClearanceSaleById, deleteClearanceSale};