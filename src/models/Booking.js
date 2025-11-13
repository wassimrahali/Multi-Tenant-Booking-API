const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tenantKey: String,
  user: String,
  ticketType: String,
  quantity: Number,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
