const express = require('express');
const router = express.Router();


const SubCategory = require('../Models/subCategoryModel');

// CREATE a new sub-category
const addSubCategory = async (req, res) => {
    try {
        const subCategory = new SubCategory(req.body);
        await subCategory.save();
        res.status(201).json(subCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ all sub-categories (excluding soft-deleted)
const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({ isDeleted: false }).populate('mainCategory');
        res.json(subCategories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ a single sub-category by ID
const getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findOne({ _id: req.params.id, isDeleted: false }).populate('mainCategory');
        if (!subCategory) return res.status(404).json({ error: 'Sub-category not found' });
        res.json(subCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a sub-category by ID
const updateSubCategory = async (req, res) => {
    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('mainCategory');
        if (!updatedSubCategory) return res.status(404).json({ error: 'Sub-category not found' });
        res.json(updatedSubCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE a sub-category by ID (soft delete)
const deleteSubCategory = async (req, res) => {
    try {
        const deletedSubCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!deletedSubCategory) return res.status(404).json({ error: 'Sub-category not found' });
        res.json({ message: 'Sub-category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// RESTORE a soft-deleted sub-category by ID
const restoreSubCategory = async (req, res) => {
    try {
        const restoredSubCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            { isDeleted: false },
            { new: true }
        );
        if (!restoredSubCategory) return res.status(404).json({ error: 'Sub-category not found or already active' });
        res.json({ message: 'Sub-category restored successfully', restoredSubCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getSubCategoryByName = async (req, res) => {
    try {
        const { subCategoryName } = req.query;
        console.log("sudha");
        
        console.log(subCategoryName);
        

        // Check if `subCategoryName` query parameter exists
        if (!subCategoryName) {
            return res.status(400).json({ error: 'Subcategory name is required as a query parameter' });
        }

        // Fetch subcategories by name (case-insensitive search)
        const subcategories = await SubCategory.find({
            subCategoryName: { $regex: subCategoryName, $options: 'i' },
            isDeleted: false // Ensure only active subcategories are returned
        }).populate('mainCategory', 'categoryName');

        if (subcategories.length === 0) {
            return res.status(404).json({ message: 'No subcategories found with the specified name' });
        }

        res.status(200).json(subcategories);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'An error occurred while fetching subcategories' });
    }
};

module.exports = {
    addSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
    restoreSubCategory,
    getSubCategoryByName
};
