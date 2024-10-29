import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ trades, onSort }) {
    return (
        <div className="dashboard">
            <table className="trades-table">
                <thead>
                    <tr>
                        <th onClick={() => onSort('tradeId')}>Trade ID</th>
                        <th onClick={() => onSort('tradeDate')}>Trade Date</th>
                        <th onClick={() => onSort('effective')}>Effective</th>
                        <th onClick={() => onSort('maturity')}>Maturity</th>
                        <th onClick={() => onSort('notional')}>Notional</th>
                        <th onClick={() => onSort('currency')}>Currency</th>
                        <th onClick={() => onSort('type')}>Type</th>
                        <th onClick={() => onSort('counterparty')}>Counterparty</th>
                        <th onClick={() => onSort('status')}>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trades.map(trade => (
                        <tr key={trade.id}>
                            <td>
                                <Link to={`/trade/${trade.id}`}>
                                    {trade.id}
                                </Link>
                            </td>
                            <td>{trade.tradeDate}</td>
                            <td>{trade.effective}</td>
                            <td>{trade.maturity}</td>
                            <td>{trade.notional.toLocaleString()}</td>
                            <td>{trade.currency}</td>
                            <td>{trade.type}</td>
                            <td>{trade.counterparty}</td>
                            <td>
                                <span className={`status-${trade.status.toLowerCase()}`}>
                                    {trade.status}
                                </span>
                            </td>
                            <td>
                                <Link 
                                    to={`/trade/${trade.id}`}
                                    className="view-button"
                                >
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {trades.length === 0 && (
                <div className="no-trades">
                    No trades found
                </div>
            )}
        </div>
    );
}

export default Dashboard;
