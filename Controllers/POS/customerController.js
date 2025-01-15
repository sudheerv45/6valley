const express = require('express');
const router = express.Router();
const Customer = require('../../Models/POS/CustomerModel');

// Create a new customer
const addCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all customers (excluding soft-deleted)
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ isDeleted: false });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, isDeleted: false });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a customer by ID
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer || customer.isDeleted) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Soft delete a customer by ID
const softDeleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json({ message: 'Customer soft deleted', customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Restore a soft-deleted customer by ID
const restoreCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true });
    if (!customer) return res.status(404).json({ message: 'Customer not found or not soft deleted' });
    res.status(200).json({ message: 'Customer restored', customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    addCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    softDeleteCustomer,
    restoreCustomer
};
