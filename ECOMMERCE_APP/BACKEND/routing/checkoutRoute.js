const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Create a new order
router.post('/createOrder', checkoutController.createOrder);

// Get all orders
router.get('/getOrders', checkoutController.getAllOrders);

// Get a single order by ID
router.get('/getOrder/:id', checkoutController.getOrderById);

// Delete an order by ID
router.delete('/getOrder/:id', checkoutController.deleteOrder);

module.exports = router;