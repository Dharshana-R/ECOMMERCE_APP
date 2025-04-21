const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", 
    required: true
  },
  size: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Inventory", inventorySchema);
