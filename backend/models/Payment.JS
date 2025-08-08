const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  amount: Number,
  paymentDate: { type: Date, default: Date.now },
  method: String // e.g., 'card', 'cash'
});

module.exports = mongoose.model('Payment', paymentSchema, 'Payments');
