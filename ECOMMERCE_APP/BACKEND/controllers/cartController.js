const Cart = require('../model/cart');

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, name, price, selectedSize, quantity } = req.body;

    // Validate
    if (!productId || !name || !price || !selectedSize || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if item already exists
    const existingItem = await Cart.findOne({ productId, selectedSize });
    if (existingItem) {
      // Update the quantity of the existing item
      existingItem.quantity += quantity;
      const updatedItem = await existingItem.save();
      return res.status(200).json(updatedItem); // Return the updated item
    }

    // Save new item if it doesn't exist
    const newItem = new Cart({ productId, name, price, selectedSize, quantity });
    const savedItem = await newItem.save();

    res.status(201).json(savedItem); // Return the newly added item
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Check if the product is already in the cart
const checkProductInCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      res.status(200).json({ message: "Product already in cart", exists: true });
    } else {
      res.status(200).json({ message: "Product not in cart", exists: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all cart items
const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update quantity of a cart item
const updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedItem = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update quantity" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await Cart.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addToCart,
  checkProductInCart,
  getCartItems,
  removeFromCart,
  updateQuantity
};
