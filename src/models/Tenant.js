const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: String,
  key: { type: String, unique: true }, // e.g., tenantA
});

module.exports = mongoose.model('Tenant', tenantSchema);
