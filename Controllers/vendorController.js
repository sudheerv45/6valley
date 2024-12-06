const Vendor = require("../Models/Vendor");
const bcrypt = require("bcrypt");

// Create a Vendor
const createVendor = async (req, res) => {
    const {
        firstName, lastName, phone, email, password, confirmPassword, 
        shopName, shopAddress
    } = req.body;

    const { vendorImage, shopLogo, shopBanner } = req.files || {};

    try {
        // Validate passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if email is already registered
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new vendor
        const newVendor = new Vendor({
            firstName,
            lastName,
            phone,
            email,
            password: hashedPassword,
            shopName,
            shopAddress,
            vendorImage: vendorImage?.path,
            shopLogo: shopLogo?.path,
            shopBanner: shopBanner?.path,
        });

        await newVendor.save();

        res.status(201).json({ message: 'Vendor created successfully', vendor: newVendor });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all Vendors
const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json({ message: "Vendors retrieved successfully.", vendors });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get Vendor by ID
const getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }
        res.status(200).json({ message: "Vendor retrieved successfully.", vendor });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update Vendor
const updateVendor = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const vendor = await Vendor.findByIdAndUpdate(id, updates, { new: true });
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json({ message: 'Vendor updated successfully', vendor });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Vendor
const deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }
        res.status(200).json({ message: "Vendor deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const submitNewProductRequest = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        const approvalRequest = new ProductApproval({
            vendorId: req.vendorId, // Vendor's ID from the request context
            productId: product._id,
            requestType: 'New',
        });

        await approvalRequest.save();
        res.status(201).json({ message: 'Product request submitted for approval', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const submitUpdateRequest = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const approvalRequest = new ProductApproval({
            vendorId: req.vendorId, // Vendor's ID from the request context
            productId: product._id,
            requestType: 'Update',
            requestDetails: req.body, // Details of the requested update
        });

        await approvalRequest.save();
        res.status(201).json({ message: 'Product update request submitted for approval' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createVendor, 
    getAllVendors, 
    getVendorById, 
    updateVendor, 
    deleteVendor, 
    submitNewProductRequest, 
    submitUpdateRequest
};