const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const app = express();
app.use(express.json());

// Function to read CSV files and extract latest CLOSE price
function getStockPrices() {
  const stocksFolder = path.join(__dirname, 'data', 'stocks');
  const stocks = [];

  // Recursively read all subfolders
  function readFolders(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        readFolders(filePath); // Recurse into subfolders
      } else if (file.endsWith('.csv')) {
        const stockId = path.basename(file, '.csv'); // Use filename as stock ID
        let latestPrice = null;
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => {
            if (row.CLOSE) {
              latestPrice = parseFloat(row.CLOSE); // Update with latest CLOSE
            }
          })
          .on('end', () => {
            if (latestPrice !== null) {
              stocks.push({ id: stockId, price: latestPrice });
            }
          });
      }
    });
  }

  readFolders(stocksFolder);
  return stocks; // Simplified sync approach
}

// Serve stock prices
app.get('/stocks', (req, res) => {
  const stocks = getStockPrices();
  // Delay to ensure all files are processed
  setTimeout(() => res.json(stocks), 100);
});

// Start server
app.listen(3001, () => console.log('Server running on port 3001'));