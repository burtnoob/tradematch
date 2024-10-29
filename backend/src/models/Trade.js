// File path: backend/src/models/Trade.js
import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    generalInfo: {
        tradeId: {
            type: String,
            required: true,
            unique: true
        },
        tradeDate: {
            type: Date,
            required: true
        },
        effective: {
            type: Date,
            required: true
        },
        maturity: {
            type: Date,
            required: true
        },
        notional: {
            type: Number,
            required: true,
            min: 0
        },
        currency: {
            type: String,
            required: true,
            enum: ['USD', 'EUR', 'GBP', 'JPY']
        },
        type: {
            type: String,
            required: true,
            enum: ['Interest Rate Swap', 'FX Forward', 'Option']
        },
        counterparty: {
            type: String,
            required: true
        },
        legalEntity: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Confirmed', 'Disputed'],
            default: 'Pending'
        }
    },
    floatingLeg: {
        index: {
            type: String,
            required: true
        },
        spread: {
            type: String,
            required: true
        },
        reset: {
            type: String,
            required: true,
            enum: ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual']
        },
        payment: {
            type: String,
            required: true,
            enum: ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual']
        },
        dayCount: {
            type: String,
            required: true,
            enum: ['ACT/360', '30/360', 'ACT/365']
        },
        businessDay: {
            type: String,
            required: true,
            enum: ['Following', 'Modified Following', 'Preceding']
        }
    },
    fixedLeg: {
        rate: {
            type: String,
            required: true
        },
        payment: {
            type: String,
            required: true,
            enum: ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual']
        },
        dayCount: {
            type: String,
            required: true,
            enum: ['ACT/360', '30/360', 'ACT/365']
        },
        businessDay: {
            type: String,
            required: true,
            enum: ['Following', 'Modified Following', 'Preceding']
        }
    },
    additional: {
        clearingHouse: {
            type: String,
            required: false
        },
        collateral: {
            type: String,
            required: false
        },
        breakClause: {
            type: String,
            required: false
        },
        optionDetails: {
            type: String,
            required: false
        }
    },
    disputeReason: {
        type: String,
        required: false
    },
    confirmationTime: {
        type: Date
    },
    disputeTime: {
        type: Date
    }
}, {
    timestamps: true
});

// Index for faster queries
tradeSchema.index({ 'generalInfo.tradeId': 1, user: 1 });
tradeSchema.index({ 'generalInfo.tradeDate': -1 });
tradeSchema.index({ 'generalInfo.status': 1 });

// Virtual for time until maturity
tradeSchema.virtual('timeToMaturity').get(function() {
    return Math.ceil((this.generalInfo.maturity - new Date()) / (1000 * 60 * 60 * 24));
});

// Methods
tradeSchema.methods.confirm = async function() {
    this.generalInfo.status = 'Confirmed';
    this.confirmationTime = new Date();
    return this.save();
};

tradeSchema.methods.dispute = async function(reason) {
    this.generalInfo.status = 'Disputed';
    this.disputeReason = reason;
    this.disputeTime = new Date();
    return this.save();
};

const Trade = mongoose.model('Trade', tradeSchema);

export default Trade;
