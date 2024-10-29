import React from 'react';

function TradeDetails({ trade, onConfirm, onDispute }) {
    const {
        generalInfo,
        floatingLeg,
        fixedLeg,
        additional
    } = trade;

    return (
        <div className="trade-details">
            <div className="trade-details-grid">
                {/* General Information Section */}
                <div className="details-section">
                    <h2>General Information</h2>
                    <div className="details-content">
                        <div className="detail-item">
                            <span>Trade ID:</span>
                            <span>{generalInfo.tradeId}</span>
                        </div>
                        <div className="detail-item">
                            <span>Trade Date:</span>
                            <span>{generalInfo.tradeDate}</span>
                        </div>
                        <div className="detail-item">
                            <span>Effective Date:</span>
                            <span>{generalInfo.effective}</span>
                        </div>
                        <div className="detail-item">
                            <span>Maturity Date:</span>
                            <span>{generalInfo.maturity}</span>
                        </div>
                        <div className="detail-item">
                            <span>Notional:</span>
                            <span>{generalInfo.notional.toLocaleString()} {generalInfo.currency}</span>
                        </div>
                        <div className="detail-item">
                            <span>Type:</span>
                            <span>{generalInfo.type}</span>
                        </div>
                        <div className="detail-item">
                            <span>Counterparty:</span>
                            <span>{generalInfo.counterparty}</span>
                        </div>
                        <div className="detail-item">
                            <span>Status:</span>
                            <span className={`status-${generalInfo.status.toLowerCase()}`}>
                                {generalInfo.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Floating Leg Section */}
                <div className="details-section">
                    <h2>Floating Leg Details</h2>
                    <div className="details-content">
                        <div className="detail-item">
                            <span>Index:</span>
                            <span>{floatingLeg.index}</span>
                        </div>
                        <div className="detail-item">
                            <span>Spread:</span>
                            <span>{floatingLeg.spread}</span>
                        </div>
                        <div className="detail-item">
                            <span>Reset:</span>
                            <span>{floatingLeg.reset}</span>
                        </div>
                        <div className="detail-item">
                            <span>Payment:</span>
                            <span>{floatingLeg.payment}</span>
                        </div>
                        <div className="detail-item">
                            <span>Day Count:</span>
                            <span>{floatingLeg.dayCount}</span>
                        </div>
                        <div className="detail-item">
                            <span>Business Day:</span>
                            <span>{floatingLeg.businessDay}</span>
                        </div>
                    </div>
                </div>

                {/* Fixed Leg Section */}
                <div className="details-section">
                    <h2>Fixed Leg Details</h2>
                    <div className="details-content">
                        <div className="detail-item">
                            <span>Rate:</span>
                            <span>{fixedLeg.rate}</span>
                        </div>
                        <div className="detail-item">
                            <span>Payment:</span>
                            <span>{fixedLeg.payment}</span>
                        </div>
                        <div className="detail-item">
                            <span>Day Count:</span>
                            <span>{fixedLeg.dayCount}</span>
                        </div>
                        <div className="detail-item">
                            <span>Business Day:</span>
                            <span>{fixedLeg.businessDay}</span>
                        </div>
                    </div>
                </div>

                {/* Additional Information Section */}
                <div className="details-section">
                    <h2>Additional Information</h2>
                    <div className="details-content">
                        <div className="detail-item">
                            <span>Clearing House:</span>
                            <span>{additional.clearingHouse}</span>
                        </div>
                        <div className="detail-item">
                            <span>Collateral:</span>
                            <span>{additional.collateral}</span>
                        </div>
                        <div className="detail-item">
                            <span>Break Clause:</span>
                            <span>{additional.breakClause}</span>
                        </div>
                        <div className="detail-item">
                            <span>Option Details:</span>
                            <span>{additional.optionDetails}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="trade-actions">
                {generalInfo.status === 'Pending' && (
                    <>
                        <button 
                            onClick={onConfirm}
                            className="confirm-button"
                        >
                            Confirm Trade
                        </button>
                        <button 
                            onClick={onDispute}
                            className="dispute-button"
                        >
                            Dispute Trade
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default TradeDetails;
