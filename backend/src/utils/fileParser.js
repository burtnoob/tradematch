// src/utils/fileParser.js
const csv = require('csv-parse');
const fs = require('fs');

const parseTradeFile = (file) => {
  return new Promise((resolve, reject) => {
    try {
      // If no file is provided, return empty array
      if (!file) {
        return resolve([]);
      }

      const trades = [];

      // Read the file
      fs.createReadStream(file.path)
        .pipe(csv.parse({
          columns: true,
          skip_empty_lines: true
        }))
        .on('data', (data) => {
          trades.push({
            id: data.id,
            trade_date: data.trade_date,
            asset_class: data.asset_class,
            product_type: data.product_type,
            notional: parseFloat(data.notional),
            currency: data.currency,
            counterparty_org_id: parseInt(data.counterparty_org_id)
          });
        })
        .on('end', () => {
          // Delete the temporary file
          fs.unlink(file.path, (err) => {
            if (err) console.error('Error deleting temp file:', err);
          });
          resolve(trades);
        })
        .on('error', (error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  parseTradeFile
};