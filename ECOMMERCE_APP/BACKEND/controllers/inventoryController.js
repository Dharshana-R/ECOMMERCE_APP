const Inventory = require("../model/inventory");

const addInventory = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    const savedItem = await inventory.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllInventory = async (req, res) => {
  try {
    const allInventory = await Inventory.find();
    res.status(200).json(allInventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addInventory,
  getAllInventory
};