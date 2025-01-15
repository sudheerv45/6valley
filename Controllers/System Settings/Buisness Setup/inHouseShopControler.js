// controllers/houseShop.controller.js
const HouseShop = require('../../../Models/System Settings/Buiness Setup/inHouseShopModel');

const createOrUpdateHouseShop = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const updatedHouseShop = await HouseShop.findByIdAndUpdate(
        id,
        { ...req.body, isDeleted: false },
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedHouseShop);
    }
    const newHouseShop = new HouseShop(req.body);
    await newHouseShop.save();
    res.status(201).json(newHouseShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHouseShop = async (req, res) => {
  try {
    const { id } = req.params;
    const houseShop = await HouseShop.findOne({ _id: id, isDeleted: false });
    if (!houseShop) return res.status(404).json({ message: 'HouseShop not found' });
    res.status(200).json(houseShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllHouseShops = async (req, res) => {
  try {
    const houseShops = await HouseShop.find({ isDeleted: false });
    res.status(200).json(houseShops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const softDeleteHouseShop = async (req, res) => {
  try {
    const { id } = req.params;
    const houseShop = await HouseShop.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!houseShop) return res.status(404).json({ message: 'HouseShop not found' });
    res.status(200).json({ message: 'HouseShop soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const restoreHouseShop = async (req, res) => {
  try {
    const { id } = req.params;
    const houseShop = await HouseShop.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    );
    if (!houseShop) return res.status(404).json({ message: 'HouseShop not found' });
    res.status(200).json({ message: 'HouseShop restored successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleTemporaryClose = async (req, res) => {
  try {
    const { id } = req.params;
    const houseShop = await HouseShop.findById(id);
    if (!houseShop) return res.status(404).json({ message: 'HouseShop not found' });

    houseShop.temporaryClose = !houseShop.temporaryClose;
    await houseShop.save();

    res.status(200).json({ message: 'Temporary close status toggled', houseShop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleVacationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const houseShop = await HouseShop.findById(id);
    if (!houseShop) return res.status(404).json({ message: 'HouseShop not found' });

    houseShop.vacation.status = !houseShop.vacation.status;
    await houseShop.save();

    res.status(200).json({ message: 'Vacation status toggled', houseShop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateHouseShop,
  getHouseShop,
  getAllHouseShops,
  softDeleteHouseShop,
  restoreHouseShop,
  toggleTemporaryClose,
  toggleVacationStatus,
};