import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import page components
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TradeDetailsPage from './pages/TradeDetailsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/trade/:id" component={TradeDetailsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
