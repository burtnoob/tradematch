// File path: backend/src/controllers/tradeController.js
import Trade from '../models/Trade.js';

// Get all trades
export const getTrades = async (req, res) => {
    try {
        const trades = await Trade.find({ user: req.user.id })
            .sort({ tradeDate: -1 }); // Sort by trade date, newest first
        res.json(trades);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching trades' });
    }
};

// Get single trade
export const getTrade = async (req, res) => {
    try {
        const trade = await Trade.findOne({
            _id: req.params.id,
            user: req.user.id
        });
        
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        
        res.json(trade);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching trade' });
    }
};

// Create new trade
export const createTrade = async (req, res) => {
    try {
        const newTrade = new Trade({
            ...req.body,
            user: req.user.id,
            status: 'Pending'
        });

        const trade = await newTrade.save();
        res.status(201).json(trade);
    } catch (err) {
        res.status(400).json({ message: 'Error creating trade' });
    }
};

// Update trade
export const updateTrade = async (req, res) => {
    try {
        const trade = await Trade.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );

        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }

        res.json(trade);
    } catch (err) {
        res.status(400).json({ message: 'Error updating trade' });
    }
};

// Confirm trade
export const confirmTrade = async (req, res) => {
    try {
        const trade = await Trade.findOneAndUpdate(
            { 
                _id: req.params.id, 
                user: req.user.id,
                status: 'Pending'
            },
            { status: 'Confirmed' },
            { new: true }
        );

        if (!trade) {
            return res.status(404).json({ 
                message: 'Trade not found or already confirmed/disputed' 
            });
        }

        res.json(trade);
    } catch (err) {
        res.status(400).json({ message: 'Error confirming trade' });
    }
};

// Dispute trade
export const disputeTrade = async (req, res) => {
    try {
        const trade = await Trade.findOneAndUpdate(
            { 
                _id: req.params.id, 
                user: req.user.id,
                status: 'Pending'
            },
            { 
                status: 'Disputed',
                disputeReason: req.body.reason
            },
            { new: true }
        );

        if (!trade) {
            return res.status(404).json({ 
                message: 'Trade not found or already confirmed/disputed' 
            });
        }

        res.json(trade);
    } catch (err) {
        res.status(400).json({ message: 'Error disputing trade' });
    }
};

// Upload trade data
export const uploadTradeData = async (req, res) => {
    try {
        // TODO: Implement file processing logic
        // 1. Parse uploaded file (CSV/Excel)
        // 2. Validate data
        // 3. Create trades in bulk
        
        res.status(201).json({ 
            message: 'Trades uploaded successfully',
            tradesProcessed: 0 // Update with actual count
        });
    } catch (err) {
        res.status(400).json({ message: 'Error processing trade data' });
    }
};

export default {
    getTrades,
    getTrade,
    createTrade,
    updateTrade,
    confirmTrade,
    disputeTrade,
    uploadTradeData
};
