const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit-card', 'paypal', 'cash-on-delivery'],
  },
  cardDetails: {
    cardNumber: {
      type: String,
      required: function () {
        return this.paymentMethod === 'credit-card';
      },
      trim: true,
    },
    expiryDate: {
      type: String,
      required: function () {
        return this.paymentMethod === 'credit-card';
      },
      trim: true,
    },
    cvv: {
      type: String,
      required: function () {
        return this.paymentMethod === 'credit-card';
      },
      trim: true,
    },
  },
  paypalEmail: {
    type: String,
    required: function () {
      return this.paymentMethod === 'paypal';
    },
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid PayPal email address'],
  },
  cartItems: [
    {
      name: {
        type: String,
        required: true,
      },
      selectedSize: {
        type: String,
        required: false,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Checkout', checkoutSchema);