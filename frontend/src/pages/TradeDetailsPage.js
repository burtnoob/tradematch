import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TradeDetails from '../components/TradeDetails';

function TradeDetailsPage() {
    const [trade, setTrade] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        // Mock API call to fetch trade details
        setTimeout(() => {
            // Simulated trade data matching our wireframe
            const mockTrade = {
                id: id,
                generalInfo: {
                    tradeId: `OTC${id}`,
                    tradeDate: '2024-10-13',
                    effective: '2024-10-15',
                    maturity: '2025-10-15',
                    notional: 10000000,
                    currency: 'USD',
                    type: 'Interest Rate Swap',
                    counterparty: 'ABCD Bank',
                    legalEntity: 'XYZ Corp',
                    status: 'Pending'
                },
                floatingLeg: {
                    index: '3M LIBOR',
                    spread: '+0.5%',
                    reset: 'Quarterly',
                    payment: 'Quarterly',
                    dayCount: 'ACT/360',
                    businessDay: 'Modified Following'
                },
                fixedLeg: {
                    rate: '2.5%',
                    payment: 'Semi-Annual',
                    dayCount: '30/360',
                    businessDay: 'Modified Following'
                },
                additional: {
                    clearingHouse: 'LCH',
                    collateral: 'CSA',
                    breakClause: '1 Year',
                    optionDetails: 'N/A'
                }
            };
            setTrade(mockTrade);
            setLoading(false);
        }, 1000);
    }, [id]);

    const handleConfirm = async () => {
        try {
            // TODO: Implement actual confirmation logic
            console.log('Confirming trade:', id);
            history.push('/dashboard');
        } catch (err) {
            setError('Failed to confirm trade');
        }
    };

    const handleDispute = async () => {
        try {
            // TODO: Implement actual dispute logic
            console.log('Disputing trade:', id);
            history.push('/dashboard');
        } catch (err) {
            setError('Failed to dispute trade');
        }
    };

    const handleBack = () => {
        history.push('/dashboard');
    };

    if (loading) return <div>Loading trade details...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!trade) return <div>Trade not found</div>;

    return (
        <div className="trade-details-page">
            <button onClick={handleBack} className="back-button">
                Back to Dashboard
            </button>
            <h1>Trade Details</h1>
            <TradeDetails 
                trade={trade}
                onConfirm={handleConfirm}
                onDispute={handleDispute}
            />
        </div>
    );
}

export default TradeDetailsPage;
