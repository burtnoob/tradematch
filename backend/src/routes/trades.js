// backend/src/routes/trades.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const db = require('../db');
const auth = require('../middleware/auth');

// Get trades based on user role
router.get('/', auth, async (req, res) => {
  try {
    console.log('User requesting trades:', req.user);
    let query;
    const params = [];

    if (req.user.organizationType === 'FI') {
      // FI users see all non-deleted trades
      query = `
        SELECT 
          t.*,
          cp.name as counterparty_name 
        FROM trades t
        JOIN organizations cp ON t.counterparty_org_id = cp.id
        WHERE t.is_deleted = FALSE
        ORDER BY t.trade_date DESC
      `;
      console.log('Executing FI query:', query);
    } else {
      // Counterparty users see only their trades
      query = `
        SELECT t.* 
        FROM trades t
        WHERE t.counterparty_org_id = $1 
        AND t.is_deleted = FALSE
        ORDER BY t.trade_date DESC
      `;
      params.push(req.user.organizationId);
      console.log('Executing Counterparty query:', query, params);
    }

    const result = await db.query(query, params);
    console.log('Query result:', result.rows);
    
    // Format the trades data
    const trades = result.rows.map(trade => ({
      id: trade.id,
      date: new Date(trade.trade_date).toLocaleDateString(),
      notional: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: trade.currency
      }).format(trade.notional),
      status: trade.status,
      counterparty: trade.counterparty_name || ''
    }));

    console.log('Sending trades:', trades);
    res.json(trades);
  } catch (error) {
    console.error('Error fetching trades:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;