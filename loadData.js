const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Stock = require('./models/Stock');

mongoose.connect('mongodb://localhost:27017/stocks', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const results = [];

fs.createReadStream('data/stocks.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    try {
      await Stock.deleteMany({});
      console.log('📦 Old stock data cleared.');

      const formatted = results.map(r => ({
        name: r.Name,
        symbol: r.Symbol,
        price: parseFloat(r.Price),
        historical: JSON.parse(r.Historical || '[]')
      }));

      await Stock.insertMany(formatted);
      console.log('🎉 Data loaded into MongoDB!');
    } catch (err) {
      console.error('❌ Error loading data:', err);
    } finally {
      mongoose.connection.close();
    }
  });
