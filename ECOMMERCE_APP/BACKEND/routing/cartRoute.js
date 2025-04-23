const express = require("express");
const router = express.Router();

const {
  addToCart,
  checkProductInCart,
  getCartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
} = require("../controllers/cartController");

// Add product to cart
router.post("/addToCart", addToCart); // POST /api/cart

// Check if product is in the cart
router.get("/cart/check/:productId", checkProductInCart); // GET /api/cart/check/:productId

// Get all cart items
router.get("/cart", getCartItems); // GET /api/cart

// Update the quantity of a cart item
router.put("/cart/:id", updateQuantity); // PUT /api/cart/:id

// Remove item from cart
router.delete("/cart/:id", removeFromCart); // DELETE /api/cart/:id

// Remove all items from cart
router.delete("/clearCart",clearCart);

module.exports = router;
