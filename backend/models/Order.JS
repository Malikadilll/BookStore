const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  quantity: Number,
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema, 'Orders');
