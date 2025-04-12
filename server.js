const express = require('express');
const mongoose = require('mongoose');
const stockRoutes = require('./routes/stocks');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/stocks')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/stocks', stockRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
