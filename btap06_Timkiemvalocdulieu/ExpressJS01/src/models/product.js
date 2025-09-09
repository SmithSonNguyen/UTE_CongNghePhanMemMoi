const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  promotion: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  description: { type: String },
});

module.exports = mongoose.model('Product', productSchema);