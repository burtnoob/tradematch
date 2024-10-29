import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';

// Import page components
import DashboardPage from './pages/DashboardPage';

function DashboardPage() {
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Mock data for demonstration
        setTimeout(() => {
            const mockTrades = [
                {
                    id: 'OTC12345',
                    tradeDate: '2024-10-13',
                    effective: '2024-10-15',
                    maturity: '2025-10-15',
                    notional: 10000000,
                    currency: 'USD',
                    type: 'Interest Rate Swap',
                    counterparty: 'ABCD Bank',
                    status: 'Pending'
                },
                {
                    id: 'OTC12346',
                    tradeDate: '2024-10-14',
                    effective: '2024-10-16',
                    maturity: '2025-10-16',
                    notional: 5000000,
                    currency: 'EUR',
                    type: 'Interest Rate Swap',
                    counterparty: 'XYZ Bank',
                    status: 'Confirmed'
                }
            ];
            setTrades(mockTrades);
            setLoading(false);
        }, 1000);
    }, []);

    const handleSort = (field) => {
        // TODO: Implement sorting logic
        console.log('Sorting by:', field);
    };

    if (loading) return <div>Loading trades...</div>;
    if (error) return <div>Error loading trades: {error}</div>;

    return (
        <div className="dashboard-page">
            <h1>Trade Dashboard</h1>
            <div className="dashboard-controls">
                <button>Import Trades</button>
                <input type="text" placeholder="Search trades..." />
            </div>
            <Dashboard 
                trades={trades} 
                onSort={handleSort}
            />
        </div>
    );
}

export default DashboardPage;
