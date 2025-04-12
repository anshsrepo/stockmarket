const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  price: Number,
  historical: [
    {
      date: String,
      price: Number
    }
  ]
});

module.exports = mongoose.model('Stock', StockSchema);
