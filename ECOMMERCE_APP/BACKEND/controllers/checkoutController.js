const Checkout = require('../model/checkoutDetails');
// Save a new order
const createOrder = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      paymentMethod,
      cardDetails,
      paypalEmail,
      cartItems,
      totalAmount,
    } = req.body;

    // Create a new order
    const newOrder = new Checkout({
      name,
      email,
      address,
      paymentMethod,
      cardDetails: paymentMethod === 'credit-card' ? cardDetails : undefined,
      paypalEmail: paymentMethod === 'paypal' ? paypalEmail : undefined,
      cartItems,
      totalAmount,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Checkout.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Checkout.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Checkout.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
};