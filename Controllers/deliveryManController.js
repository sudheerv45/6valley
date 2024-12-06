const DeliveryMan = require('../Models/deliverManModel');

// Create a new delivery man
const createDeliveryMan = async (req, res) => {
  try {
    const deliveryMan = new DeliveryMan(req.body);
    await deliveryMan.save();
    res.status(201).json({ success: true, data: deliveryMan });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all delivery men (excluding soft-deleted)
const getDeliveryMen = async (req, res) => {
  try {
    const deliveryMen = await DeliveryMan.find({ isDeleted: false });
    res.status(200).json({ success: true, data: deliveryMen });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single delivery man by ID
const getDeliveryManById = async (req, res) => {
  try {
    const deliveryMan = await DeliveryMan.findById(req.params.id);
    if (!deliveryMan || deliveryMan.isDeleted) {
      return res.status(404).json({ success: false, error: 'Delivery man not found' });
    }
    res.status(200).json({ success: true, data: deliveryMan });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a delivery man by ID
const updateDeliveryMan = async (req, res) => {
  try {
    const deliveryMan = await DeliveryMan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!deliveryMan || deliveryMan.isDeleted) {
      return res.status(404).json({ success: false, error: 'Delivery man not found' });
    }
    res.status(200).json({ success: true, data: deliveryMan });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Soft delete a delivery man by ID
const softDeleteDeliveryMan = async (req, res) => {
  try {
    const deliveryMan = await DeliveryMan.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!deliveryMan) {
      return res.status(404).json({ success: false, error: 'Delivery man not found' });
    }
    res.status(200).json({ success: true, message: 'Delivery man soft deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Restore a soft-deleted delivery man by ID
const restoreDeliveryMan = async (req, res) => {
  try {
    const deliveryMan = await DeliveryMan.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true });
    if (!deliveryMan) {
      return res.status(404).json({ success: false, error: 'Delivery man not found' });
    }
    res.status(200).json({ success: true, message: 'Delivery man restored' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Permanently delete a delivery man by ID
const permanentDeleteDeliveryMan = async (req, res) => {
  try {
    const deliveryMan = await DeliveryMan.findByIdAndDelete(req.params.id);
    if (!deliveryMan) {
      return res.status(404).json({ success: false, error: 'Delivery man not found' });
    }
    res.status(200).json({ success: true, message: 'Delivery man permanently deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = {
    createDeliveryMan,
    getDeliveryManById,
    getDeliveryMen,
    updateDeliveryMan,
    softDeleteDeliveryMan,
    restoreDeliveryMan,
    permanentDeleteDeliveryMan
}