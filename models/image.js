const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: Buffer, required: true },
  reducedPercent: { type: Number, require: true }
});

module.exports = mongoose.model('Image', imageSchema);
