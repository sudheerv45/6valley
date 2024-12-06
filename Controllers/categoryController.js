const express = require('express');
const router = express.Router();

const Category = require('../Models/categoryModel');

// CREATE a new category
const addCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ all categories (excluding soft-deleted)
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isDeleted: false });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id, isDeleted: false });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE a category by ID
const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE a category by ID (soft delete)
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!deletedCategory) return res.status(404).json({ error: 'Category not found' });
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// RESTORE a soft-deleted category by ID
const restoreCategory = async (req, res) => {
    try {
        const restoredCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { isDeleted: false },
            { new: true }
        );
        if (!restoredCategory) return res.status(404).json({ error: 'Category not found or already active' });
        res.json({ message: 'Category restored successfully', restoredCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    restoreCategory
};
