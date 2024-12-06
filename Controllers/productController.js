// controllers/productController.js
const Product = require("../Models/Product");
const XLSX = require('xlsx');
const fs = require('fs');
const ProductApproval = require('../models/ProductApproval');


// Create a Product
const createProduct = async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            productThumbnail: req.body.productThumbnail,
            additionalImages: req.body.additionalImages,
        });

        await product.save();
        res.status(201).json({ message: "Product created successfully.", product });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category")
            .populate("subCategory")
            .populate("subSubCategory");
        res.status(200).json({ message: "Products retrieved successfully.", products });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get Product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category")
            .populate("subCategory")
            .populate("subSubCategory");

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product retrieved successfully.", product });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update a Product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product updated successfully.", product });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete a Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const bulkImport = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const products = data.map(item => ({
            productName: item.ProductName,
            description: item.Description,
            category: item.Category,
            subCategory: item.SubCategory,
            subSubCategory: item.SubSubCategory,
            brand: item.Brand,
            productType: item.ProductType,
            productSKU: item.ProductSKU,
            unit: item.Unit,
            unitPrice: item.UnitPrice,
            minOrderQty: item.MinOrderQty,
            currentStockQty: item.CurrentStockQty,
            discountType: item.DiscountType,
            discountAmount: item.DiscountAmount,
            taxAmount: item.TaxAmount,
            taxCalculation: item.TaxCalculation,
            shippingCost: item.ShippingCost,
            productThumbnail: item.ProductThumbnail,
            additionalImages: item.AdditionalImages?.split(','),
            metaTitle: item.MetaTitle,
            metaImage: item.MetaImage,
            metaDescription: item.MetaDescription,
        }));

        await Product.insertMany(products);
        fs.unlinkSync(req.file.path); // Clean up uploaded file

        res.status(201).json({ message: 'Products imported successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const bulkExport = async (req, res) => {
    try {
        const products = await Product.find();

        const productData = products.map(product => ({
            ProductName: product.productName,
            Description: product.description,
            Category: product.category,
            SubCategory: product.subCategory,
            SubSubCategory: product.subSubCategory,
            Brand: product.brand,
            ProductType: product.productType,
            ProductSKU: product.productSKU,
            Unit: product.unit,
            UnitPrice: product.unitPrice,
            MinOrderQty: product.minOrderQty,
            CurrentStockQty: product.currentStockQty,
            DiscountType: product.discountType,
            DiscountAmount: product.discountAmount,
            TaxAmount: product.taxAmount,
            TaxCalculation: product.taxCalculation,
            ShippingCost: product.shippingCost,
            ProductThumbnail: product.productThumbnail,
            AdditionalImages: product.additionalImages?.join(','),
            MetaTitle: product.metaTitle,
            MetaImage: product.metaImage,
            MetaDescription: product.metaDescription,
        }));

        const worksheet = XLSX.utils.json_to_sheet(productData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

        const filePath = 'exports/products.xlsx';
        XLSX.writeFile(workbook, filePath);

        res.download(filePath, 'products.xlsx', err => {
            if (err) res.status(500).json({ error: err.message });
            fs.unlinkSync(filePath); // Clean up generated file
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getNewProductRequests = async (req, res) => {
    try {
        const requests = await ProductApproval.find({ requestType: 'New', status: 'Pending' }).populate('vendorId').populate('productId');
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUpdateProductRequests = async (req, res) => {
    try {
        const requests = await ProductApproval.find({ requestType: 'Update', status: 'Pending' }).populate('vendorId').populate('productId');
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const approveRequest = async (req, res) => {
    try {
        const request = await ProductApproval.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = 'Approved';
        await request.save();

        res.status(200).json({ message: 'Request approved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const denyRequest = async (req, res) => {
    try {
        const request = await ProductApproval.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = 'Denied';
        request.comments = req.body.comments;
        await request.save();

        res.status(200).json({ message: 'Request denied successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getApprovedProducts = async (req, res) => {
    try {
        const approvedProducts = await ProductApproval.find({ status: 'Approved' }).populate('vendorId').populate('productId');
        res.status(200).json(approvedProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDeniedProducts = async (req, res) => {
    try {
        const deniedProducts = await ProductApproval.find({ status: 'Denied' }).populate('vendorId').populate('productId');
        res.status(200).json(deniedProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {createProduct,
      getAllProducts, 
      getProductById,
      updateProduct, 
      deleteProduct, bulkImport, 
      bulkExport, 
      getApprovedProducts, 
      getDeniedProducts,
      getNewProductRequests,
      getUpdateProductRequests,
      denyRequest,
      approveRequest,
    };