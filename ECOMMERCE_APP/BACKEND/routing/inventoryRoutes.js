const express = require("express");
const router = express.Router();
const { addInventory, getAllInventory } = require("../controllers/inventoryController");

router.post("/add-inventory", addInventory);
router.get("/inventory", getAllInventory);

module.exports = router;