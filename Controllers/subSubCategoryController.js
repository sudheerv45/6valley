const express = require('express');
const router = express.Router();
const SubSubCategory = require('../Models/subSubCategoryModel');
const Category = require('../Models/categoryModel');
const SubCategory = require('../Models/subCategoryModel');

// CREATE a new sub-sub category
const addSubSubCategory = async (req, res) => {
    try {
        const subSubCategory = new SubSubCategory(req.body);
        await subSubCategory.save();
        res.status(201).json(subSubCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ all sub-sub categories (excluding soft-deleted)
const getSubSubCategories = async (req, res) => {
    try {
        const subSubCategories = await SubSubCategory.find({ isDeleted: false })
            .populate('mainCategory')
            .populate('subCategory');
        res.json(subSubCategories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ a specific sub-sub category by ID (if not soft-deleted)
const getSubSubCategoryById = async (req, res) => {
    try {
        const subSubCategory = await SubSubCategory.findOne({
            _id: req.params.id,
            isDeleted: false,
        })
            .populate('mainCategory')
            .populate('subCategory');
        if (!subSubCategory)
            return res.status(404).json({ error: 'Sub-sub category not found' });
        res.json(subSubCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a sub-sub category by ID
const updateSubSubCategory = async (req, res) => {
    try {
        const updatedSubSubCategory = await SubSubCategory.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            req.body,
            { new: true }
        );
        if (!updatedSubSubCategory)
            return res.status(404).json({ error: 'Sub-sub category not found' });
        res.json(updatedSubSubCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE a sub-sub category by ID (soft delete)
const deleteSubSubCategory = async (req, res) => {
    try {
        const deletedSubSubCategory = await SubSubCategory.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!deletedSubSubCategory)
            return res.status(404).json({ error: 'Sub-sub category not found' });
        res.json({ message: 'Sub-sub category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// RESTORE a soft-deleted sub-sub category by ID
const restoreSubSubCategory = async (req, res) => {
    try {
        const restoredSubSubCategory = await SubSubCategory.findOneAndUpdate(
            { _id: req.params.id, isDeleted: true },
            { isDeleted: false },
            { new: true }
        );
        if (!restoredSubSubCategory)
            return res.status(404).json({ error: 'Sub-sub category not found or already active' });
        res.json({ message: 'Sub-sub category restored successfully', restoredSubSubCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET sub-sub categories by mainCategory or subCategory


const getSubSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryName, subCategoryName } = req.query;

        let filter = {};

        // Add filters if categoryName or subCategoryName is provided
        if (categoryName) {
            const mainCategory = await Category.findOne({ categoryName });
            if (!mainCategory) {
                return res.status(404).json({ error: "Main category not found" });
            }
            filter.mainCategory = mainCategory._id;
        }

        if (subCategoryName) {
            const subCategory = await SubCategory.findOne({ subCategoryName });
            if (!subCategory) {
                return res.status(404).json({ error: "Sub-category not found" });
            }
            filter.subCategory = subCategory._id;
        }

        // Fetch sub-sub-categories based on the filter
        const subSubCategories = await SubSubCategory.find(filter)
            .populate('mainCategory', 'categoryName') // Populate mainCategory with categoryName
            .populate('subCategory', 'subCategoryName') // Populate subCategory with subCategoryName
            .where({ isDeleted: false });

        res.json(subSubCategories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = {
    addSubSubCategory,
    getSubSubCategories,
    getSubSubCategoryById,
    updateSubSubCategory,
    deleteSubSubCategory,
    restoreSubSubCategory,
    getSubSubCategoriesByCategory,
};
