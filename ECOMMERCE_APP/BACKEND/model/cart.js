const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  selectedSize: { type: String, required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model("cart", cartSchema);
