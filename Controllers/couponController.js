const Coupon = require("../Models/Coupon");
const { v4: uuidv4 } = require("uuid"); // For generating random codes

// Generate a random coupon code
const generateCouponCode = (req, res) => {
    const randomCode = uuidv4().split("-")[0].toUpperCase(); // Generate a short random code
    res.status(200).json({ couponCode: randomCode });
};

// Create a new coupon
const createCoupon = async (req, res) => {
    try {
        const {
            couponType,
            couponTitle,
            couponCode,
            couponBearer,
            vendor,
            customer,
            limitForSameUser,
            discountType,
            discountAmount,
            minPurchase,
            maxDiscount,
            startDate,
            expiryDate,
        } = req.body;

        if (new Date(startDate) >= new Date(expiryDate)) {
            return res.status(400).json({ message: "Start date must be earlier than the expiry date." });
        }

        const coupon = new Coupon({
            couponType,
            couponTitle,
            couponCode,
            couponBearer,
            vendor,
            customer,
            limitForSameUser,
            discountType,
            discountAmount,
            minPurchase,
            maxDiscount,
            startDate,
            expiryDate,
        });

        await coupon.save();
        res.status(201).json({ message: "Coupon created successfully", coupon });
    } catch (error) {
        res.status(500).json({ message: "Failed to create coupon", error: error.message });
    }
};

// Get all coupons
const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().populate("vendor customer");
        res.status(200).json({ message: "All Coupons Retrieved Succesfully", coupons});
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch coupons", error: error.message });
    }
};

// Get a single coupon
const getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id).populate("vendor customer");
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch coupon", error: error.message });
    }
};

// Update a coupon
const updateCoupon = async (req, res) => {
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCoupon) return res.status(404).json({ message: "Coupon not found" });
        res.status(200).json({ message: "Coupon updated successfully", updatedCoupon });
    } catch (error) {
        res.status(500).json({ message: "Failed to update coupon", error: error.message });
    }
};

// Delete a coupon
const deleteCoupon = async (req, res) => {
    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!deletedCoupon) return res.status(404).json({ message: "Coupon not found" });
        res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete coupon", error: error.message });
    }
};

// Activate or deactivate a coupon
const toggleCouponStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        // Toggle status
        coupon.status = coupon.status === "active" ? "inactive" : "active";
        coupon.updatedAt = new Date(); // Update the timestamp
        await coupon.save();

        res.status(200).json({ message: `Coupon is now ${coupon.status}`, coupon });
    } catch (error) {
        res.status(500).json({ message: "Failed to toggle coupon status", error: error.message });
    }
};


module.exports = {createCoupon, getAllCoupons, getCouponById, deleteCoupon, updateCoupon, generateCouponCode, toggleCouponStatus};