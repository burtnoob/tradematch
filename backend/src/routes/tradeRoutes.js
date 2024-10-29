// File path: backend/src/routes/tradeRoutes.js
import express from 'express';
import tradeController from '../controllers/tradeController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all trades
router.get('/', auth, tradeController.getTrades);

// Get single trade
router.get('/:id', auth, tradeController.getTrade);

// Create new trade
router.post('/', auth, tradeController.createTrade);

// Update trade
router.put('/:id', auth, tradeController.updateTrade);

// Confirm trade
router.post('/:id/confirm', auth, tradeController.confirmTrade);

// Dispute trade
router.post('/:id/dispute', auth, tradeController.disputeTrade);

// Upload trade data
router.post('/upload', auth, tradeController.uploadTradeData);

export default router;
