const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  tenantKey: String,
  type: String,
  price: Number,
  available: Number,
});

module.exports = mongoose.model('Ticket', ticketSchema);
