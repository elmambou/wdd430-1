const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  included: { type: Boolean, required: true }
});

module.exports = mongoose.model('Product', productSchema);
