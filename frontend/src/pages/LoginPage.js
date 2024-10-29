import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../components/Login';

function LoginPage() {
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleLogin = async (credentials) => {
        try {
            // TODO: Implement actual authentication
            // Temporary mock authentication
            if (credentials.username === 'demo' && credentials.password === 'password') {
                // Mock successful login
                console.log('Login successful');
                history.push('/dashboard');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('An error occurred during login');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>TradeMatch Login</h1>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                <Login onSubmit={handleLogin} />
                <div className="login-footer">
                    <p>Demo credentials:</p>
                    <p>Username: demo</p>
                    <p>Password: password</p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
