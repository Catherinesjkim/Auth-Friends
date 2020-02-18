import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// 1. It has the same API as <Route /> - Make sure the interface (api) os equivalent to Route
// 2. It renders a <Route /> and passes all the props through 
// 3. It checks if the user is authenticated, if so, renders the Component. If not, redirects the user to login

const ProtectedRoute = ({ component: Component, ...props }) => {

  return (
    <Route 
      {...props} 
      render={() => {
        if (localStorage.getItem('token')) {
          return <Component />;
        } else {
          return <Redirect to="/login" />;
        }
      }} 
    />
  );
};

export default ProtectedRoute;
