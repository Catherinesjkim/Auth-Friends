import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Friends from './components/Friends';
import Friend from './components/Friend';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/friends">My Friends</Link>
          </li>
        </ul>
        <Switch>
          <ProtectedRoute exact path="/friends" component={Friends} />
          <ProtectedRoute exact path="/friends/:id" component={Friend} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
